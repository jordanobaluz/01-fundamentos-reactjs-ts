import { ThumbsUp, Trash } from 'phosphor-react'
import { useState } from 'react'
import { Avatar } from './Avatar'
import styles from './Comment.module.css'

interface CommentProps {
    content: string;
    onDeleteComment: (comment: string) => void
}

export function Comment({ content, onDeleteComment }: CommentProps) {
    const [likeCount, setLikeCount] = useState(0)

    function handleDeleteComment() {
        onDeleteComment(content)
    }
    //DICA - sempre que atualizar uma informação que depende de um valor proprios anterior, utilizar o padrão abaixo
    function handleLikeComment() {
        setLikeCount((state) => {
            return state + 1
        })
    }

    return (
        <div className={styles.comment}>
            <Avatar hasBorder={false} src="https://github.com/AugustoCalaca.png" alt='' />
            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Augusto Calaca</strong>
                            <time
                                title='29 de Setembro às 21:20'
                                dateTime='2022-09-29 21:20'
                            >Cerca de 1h atrás</time>
                        </div>
                        <button onClick={handleDeleteComment} title='Deletar comentário'>
                            <Trash size={24} />
                        </button>
                    </header>
                    <p>{content}</p>
                </div>
                <footer>
                    <button onClick={handleLikeComment}>
                        <ThumbsUp />
                        Aplaudir <span>{likeCount}</span>
                    </button>
                </footer>
            </div>
        </div>
    )
}