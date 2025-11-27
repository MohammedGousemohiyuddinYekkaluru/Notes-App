import React, { useEffect, useState } from "react";

const App = () => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [task, setTask] =  useState(() => {
  const saved = localStorage.getItem("notes");
  return saved ? JSON.parse(saved) : [];
});

  const submitHandler = (e) => {
    e.preventDefault();

    if (!title.trim() || !details.trim()) return;

    const copyTask = [...task];
    copyTask.push({ title, details });
    setTask(copyTask);

    setTitle("");
    setDetails("");
  };

  const deleteNote = (idx) => {
    const deleteTask = [...task];
    deleteTask.splice(idx, 1);
    setTask(deleteTask);
  };

  useEffect(() => {
  localStorage.setItem("notes", JSON.stringify(task));
}, [task]);


  return (
    <div
      className="lg:h-screen lg:flex sm:min-h-screen
      bg-black text-white"
    >
      <form
        onSubmit={(e) => submitHandler(e)}
        className="flex p-10 flex-col lg:w-1/2 gap-4"
      >
        <h1 className="text-4xl font-bold">Add Notes</h1>

        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="px-5 py-2 w-full border-2 rounded font-medium outline-0"
          placeholder="Enter Notes Heading"
          type="text"
        />

        <textarea
          onChange={(e) => setDetails(e.target.value)}
          value={details}
          className="px-5 py-2 h-35 w-full border-2 rounded font-medium outline-0"
          placeholder="Write details"
          type="text"
        />

        <button className="cursor-pointer active:scale-99 font-medium bg-white text-black px-5 py-2 rounded">
          Add note
        </button>
      </form>

      <div className="lg:w-1/2 p-10 lg:border-l-2">
        <h1 className="text-4xl font-bold">Recent Notes</h1>
        <div className="flex flex-wrap items-start justify-start gap-4 mt-4 h-[90%] overflow-auto">
          {task.map((item, idx) => {
            return (
                <div
                  key={idx}
                  className="flex justify-between flex-col items-start h-50 w-40 bg-cover rounded-xl bg-[url('https://static.vecteezy.com/system/resources/previews/037/152/677/non_2x/sticky-note-paper-background-free-png.png')] text-black pt-6 pb-2 px-4"
                >
                  <div className="overflow-auto max-h-36">
                    <h3 className="leading-tight font-bold text-lg wrap-break-word">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500 leading-tight wrap-break-word">
                      {item.details}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      deleteNote(idx);
                    }}
                    className="w-full text-white py-1 cursor-pointer active:scale-95 bg-red-500 text-xs rounded font-bold"
                  >
                    Delete
                  </button>
                </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
