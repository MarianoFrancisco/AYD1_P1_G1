import { useState, useEffect } from 'react'

interface CommentsSectionProps {
  id_user: number
  id_pelicula: number
}

interface Comment {
  id_comentario: number
  contenido: string
  id_user: number
  id_pelicula: number
}

interface User {
  id: number
  nombre: string
  apellido: string
  correo: string
}

export function CommentsSection({ id_user, id_pelicula }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [users, setUsers] = useState<{ [key: number]: User }>({})
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [newComment, setNewComment] = useState<string>('')

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/comentarios/${id_pelicula}`)
        const commentsData = await commentsResponse.json()
        setComments(commentsData)
      } catch (error) {
        console.error("Error fetching comments:", error)
      }
    }

    fetchComments()
  }, [id_pelicula])

  useEffect(() => {
    const fetchUserInfo = async (userId: number) => {
      try {
        const userResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/usuarios/${userId}`)
        const userData = await userResponse.json()
        setUsers(prevState => ({
          ...prevState,
          [userId]: userData,
        }))
      } catch (error) {
        console.error(`Error fetching user information for user ${userId}:`, error)
      }
    }

    comments.forEach(comment => {
      if (!users[comment.id_user]) {
        fetchUserInfo(comment.id_user)
      }
    })

    if (!users[id_user]) {
      fetchUserInfo(id_user)
    }
  }, [comments, users, id_user])

  useEffect(() => {
    setCurrentUser(users[id_user] || null)
  }, [users, id_user])

  const handleDeleteComment = async (commentId: number) => {
    try {
      setComments(prevComments => prevComments.filter(comment => comment.id_comentario !== commentId))
      await fetch(`${import.meta.env.VITE_API_URL}/api/comentarios/individual/${commentId}`, {
        method: 'DELETE',
      })
    } catch (error) {
      console.error("Error deleting comment:", error)
    }
  }

  const handlePublishComment = async () => {
    try {
      const newCommentData: Comment = {
        id_comentario: comments.length + 1,
        contenido: newComment,
        id_user,
        id_pelicula,
      }
      setComments(prevComments => [...prevComments, newCommentData])
      await fetch(`${import.meta.env.VITE_API_URL}/api/comentarios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCommentData),
      })
      setNewComment('')
    } catch (error) {
      console.error("Error publishing comment:", error)
    }
  }

  return (
    <div className="border-t border-gray-300 pt-4">
      <h3 className="text-lg font-semibold mb-4" style={{ fontWeight: 'bold' }}>Comentarios</h3>
      {comments.map(comment => (
        <div key={comment.id_comentario} className="border-b border-gray-300 pb-4 mb-4 bg-gray-100 rounded-lg shadow-md p-4">
          <div>
            {users[comment.id_user] && (
              <>
                <p className="font-semibold text-base">{users[comment.id_user].nombre} {users[comment.id_user].apellido}</p>
                <p className="text-sm text-gray-700 mb-2">{users[comment.id_user].correo}</p>
              </>
            )}
          </div>
          <p className="text-sm">{comment.contenido}</p>
          {comment.id_user === id_user && (
            <button onClick={() => handleDeleteComment(comment.id_comentario)} className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition mt-2 text-sm">Eliminar</button>
          )}
        </div>
      ))}
      <div>
        <div>
          {currentUser && (
            <>
              <p className="font-semibold text-base">{currentUser.nombre} {currentUser.apellido}</p>
              <p className="text-sm text-gray-700 mb-2">{currentUser.correo}</p>
            </>
          )}
        </div>
        <textarea
          className="w-full h-24 p-2 mb-2 border rounded shadow-inner resize-none text-sm"
          placeholder="Agregar un comentario"
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
        />
        <button onClick={handlePublishComment} className="px-3 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition mt-0 text-sm">
          Publicar
        </button>
      </div>
    </div>
  )
}
