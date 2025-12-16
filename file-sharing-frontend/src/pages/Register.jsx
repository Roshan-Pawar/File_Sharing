const Login = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <form className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input className="border p-2 w-full mb-3" placeholder="Email" />
        <input className="border p-2 w-full mb-3" type="password" placeholder="Password" />
        <button className="bg-blue-600 text-white w-full p-2 rounded">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login