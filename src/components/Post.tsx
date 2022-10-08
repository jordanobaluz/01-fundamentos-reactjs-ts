import { Avatar } from './Avatar'
import { Comment } from './Comment'
import styles from './Post.module.css'

import { format, formatDistanceToNow } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'

interface Author {
    name: string;
    role: string;
    avatarUrl: string;
}

//DICA - quando sabemos qual será o tipo, podemos informar direto na tipagem
interface Content {
    type: 'paragraph' | 'link'
    content: string
}

//Os objetos passados no paramentro de Post, são propriedades da interface Author
interface PostProps {
    author: Author;
    publishedAt: Date;
    content: Content[]
}

//DICA - dentro de objetos não é possível definir o formato
export function Post({ author, publishedAt, content }: PostProps) {
    const [comments, setComments] = useState(['Post muito show!'])
    // DICA - iniciar o state com uma informação no mesmo formato/tipo da informação que será armazenada posteriormente
    const [newCommentText, setNewCommentText] = useState('')

    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBr
    })

    const publishedDateRelativeToNow = formatDistanceToNow(
        publishedAt,
        {
            locale: ptBr,
            addSuffix: true
        }
    )
    //DICA - funções do HTML passam como primeiro parametro o event
    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('Esse campo é obrigatório!')
    }

    function handleCreateNewComment(event: FormEvent) {
        event.preventDefault()
        setComments([...comments, newCommentText])
        setNewCommentText('')
    }
    //DICA - generics <> informa que o evento ocorreu em uma textArea
    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        //DICA - necessário realizar esse procedimento, para não ficar aparecendo mensagem de campo obrigatório, mesmo após digitar algo
        event.target.setCustomValidity('')
        setNewCommentText(event.target.value)
    }

    //DICA - passar funções via propriedade do componente permite a manipulação dele
    function deleteComment(commentToDelete: string) {
        //DICA - na imutabilidade as variaveis não sofrem mutação, nunca se altera uma variável na memoria
        const commentsWithoutDeletedOne = comments.filter(comment => {
            return comment !== commentToDelete
        })
        setComments(commentsWithoutDeletedOne)
    }

    const isNewCommentEmpty = newCommentText.length === 0

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>
                <time
                    title={publishedDateFormatted}
                    dateTime={publishedAt.toISOString()}
                >
                    {publishedDateRelativeToNow}
                </time>
            </header>
            <div className={styles.content}>
                {content.map(line => {
                    if (line.type === 'paragraph') {
                        //DICA - key somente no primeiro element do retorno, no caso a tag <p>
                        return <p key={line.content}>{line.content}</p>
                    } else if (line.type === 'link') {
                        return <p key={line.content}><a href='#'>{line.content}</a></p>
                    }
                })}
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>
                <textarea
                    name='comment'
                    placeholder='Deixe um comentário'
                    value={newCommentText}
                    onChange={handleNewCommentChange}
                    //DICA - uma propriedade quando é True, não precisa ser informada
                    required
                    onInvalid={handleNewCommentInvalid}
                />
                <footer>
                    <button
                        type='submit'
                        disabled={isNewCommentEmpty}
                    >Publicar</button>
                </footer>
            </form>
            <div className={styles.commentList}>
                {/*DICA - não usar o index na key, pois ao mudar o conteudo de posição o index permanece o mesmo*/}
                {comments.map(comment => {
                    return (
                        <Comment
                            key={comment}
                            content={comment}
                            onDeleteComment={deleteComment}
                        />
                    )
                })}
            </div>
        </article>
    )
}