export default function Dashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50">
      <div className="p-10 bg-white shadow rounded">
        <h1 className="text-3xl font-bold">Welcome!</h1>
        <p className="mt-4">You are now logged in as: Someone@gmail.com</p>

        <a
          href="/"
          className="mt-6 inline-block bg-black text-white py-2 px-6 rounded hover:bg-zinc-800"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}
