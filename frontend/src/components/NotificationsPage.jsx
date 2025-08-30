export default function NotificationsPage() {
  const notifications = [
    { id: 1, text: "Alice liked your post", time: "2m ago" },
    { id: 2, text: "Bob started following you", time: "10m ago" },
    { id: 3, text: "Charlie commented: Nice!", time: "1h ago" },
  ];

  return (
    <div className="flex min-h-screen bg-black text-white">
      <div className="flex-1 flex flex-col items-center py-10">
        <h2 className="text-2xl font-bold mb-6">Notifications</h2>
        <div className="w-full max-w-lg space-y-4">
          {notifications.map(note => (
            <div
              key={note.id}
              className="flex items-center justify-between bg-gray-900 p-4 rounded-lg hover:bg-gray-800 transition"
            >
              <div>
                <p>{note.text}</p>
                <p className="text-gray-400 text-sm">{note.time}</p>
              </div>
              <button className="text-blue-400 hover:text-blue-300">View</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
