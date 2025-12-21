import { useParams } from "react-router-dom"
import { useEffect } from "react"
import Api from "../services/api"

const SharedFile = () => {
  const { token } = useParams()

  useEffect(() => {
    Api.get(`/api/files/shared/${token}`, {
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
