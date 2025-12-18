import { useParams } from "react-router-dom"
import { useEffect } from "react"
import api from "../services/api"

const SharedFile = () => {
  const { token } = useParams()

  useEffect(() => {
    api.get(`/files/shared/${token}`, {
      responseType: "blob"
    })
      .then(res => {
        const url = URL.createObjectURL(res.data)
        window.open(url)
      })
      .catch(() => alert("Invalid or expired link"))
  }, [])

  return <p className="p-6">Opening shared file...</p>
}

export default SharedFile
