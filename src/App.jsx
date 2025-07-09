// import { useState,useEffect,useRef } from "react";
// import { URL } from "./constant.js";
// import Recentsearch from "./component/Recentsearch.jsx"
// import QuestionAns from "./component/QuestionAns.jsx"
// import "./App.css";

// function App() {
//   const [question, setquestion] = useState("");
//   const [result, setresult] = useState([]);
//   const [recentlyhistroy, setrecentlyhistroy] = useState(JSON.parse(localStorage.getItem('history')));
//   const [selecthistory,setSelecthistory]=useState('');
//   const [loader,setloader]=useState(false);
//   const ScrollAns = useRef();

//   async function askquestion() {
//      if(!question && !selecthistory){
//       return false;
//      }
//      if(question){
//         if(localStorage.getItem('history')){
//       let history = JSON.parse(localStorage.getItem('history'));
//       history = [question,...history]
//       localStorage.setItem('history',JSON.stringify(history));
//       setrecentlyhistroy(history)
//     }else{
//       localStorage.setItem('history',JSON.stringify([question]));
//       setrecentlyhistroy([question])
//     }
//      }

//      // payload
//      const payloadData = question ? question : selecthistory
//      const payload = {
//     contents: [
//       {
//         parts: [
//           {
//             text: payloadData,
//           },
//         ],
//       },
//     ],
//   };

//     setloader(true);
//     let response = await fetch(URL, {
//       method: "POST",
//       body: JSON.stringify(payload),
//     });
//     response = await response.json();
//     let datastring = response.candidates[0].content.parts[0].text;
//     datastring = datastring.split("* ");
//     datastring = datastring.map((item) => item.trim());
//     //console.log(response.candidates[0].content);

//     setresult([
//       ...result,
//       { type: "q", text: question ? question : selecthistory },
//       { type: "a", text: datastring },
//     ]);

//     setquestion("");
//     setTimeout(()=>{
//       ScrollAns.current.scrollTop = ScrollAns.current.scrollHeight;
//     },500);
//     setloader(false);

//     //console.log(datastring);
//   }
//   //console.log(recentlyhistroy);

//   function isEnter(e){
//       //console.log(e.key);
//     if(e.key == 'Enter'){
//       askquestion();
//     }
//   }
//  useEffect(()=>{
//   //console.log(selecthistory)
//   askquestion();
//  },[selecthistory]);

//  // dark mode feacture's
//  const [darkmode,setdarkmode]=useState("dark");
//  useEffect(()=>{
//  // console.log(darkmode);
//   if(darkmode=="dark"){
//       document.documentElement.classList.add("dark")
//   }else{
//       document.documentElement.classList.remove("dark")
//   }
//  },[darkmode])

//   return (
//     <div class={darkmode=="dark"? "dark" : "light"}>
//     <div class="grid grid-cols-5 h-screen ">
//       <select id="select" value={darkmode} onChange={(e)=>setdarkmode(e.target.value)} class='fixed text-white bottom-0 p-2'>
//         <option value="dark">Dark</option>
//         <option value="light">Light</option>
//       </select>
//       <Recentsearch  recentlyhistroy={recentlyhistroy} setrecentlyhistroy={setrecentlyhistroy} setSelecthistory={setSelecthistory}/>
//       <div class="right part  col-span-4 p-10 text-center">
//         <h1 class=" mb-3 text-4xl  bg-gradient-to-r from-violet-900 via-violet-700 to-violet-900 text-transparent bg-clip-text"
//         >Hello user , Ask me Anythings..</h1>
//         {
//           loader ?<div role="status">
//           <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
//           <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
//           <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
//           </svg>
//           <span class="sr-only">Loading...</span>
//       </div> :null
//         }

//         <div ref={ScrollAns} class="container h-90 overflow-scroll  px-10  py-7 no-scrollbar  ">
//           <div class="text-zinc-200">
//             <ul>
//               {result.map((item, index) => (
//                 <QuestionAns key={index} item={item} index={index}/>
//               ))}
//             </ul>
//           </div>
//         </div>
//         <div class="bg-zinc-800 w-1/2 p-1 m-auto  rounded-4xl border text-white border-zinc-700 flex mt-10">
//           <input
//             value={question}
//             onKeyDown={isEnter}
//             onChange={(e) => setquestion(e.target.value)}
//             type="text"
//             placeholder="Ask me anything"
//             class="w-full h-full p-3 outline-none"
//           ></input>
//           <button onClick={askquestion} class="pr-4 active:scale-95">
//             Ask
//           </button>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// }

// export default App;

import { useState, useEffect, useRef } from "react";
import { URL } from "./constant.js";
import Recentsearch from "./component/Recentsearch.jsx";
import QuestionAns from "./component/QuestionAns.jsx";
import "./App.css";

function App() {
  const [question, setquestion] = useState("");
  const [result, setresult] = useState([]);
  const [recentlyhistroy, setrecentlyhistroy] = useState(
    JSON.parse(localStorage.getItem("history"))
  );
  const [selecthistory, setSelecthistory] = useState("");
  const [loader, setloader] = useState(false);
  const ScrollAns = useRef();

  // Ask question to API
  async function askquestion() {
    if (!question && !selecthistory) return false;

    if (question) {
      let history = localStorage.getItem("history")
        ? [question, ...JSON.parse(localStorage.getItem("history"))]
        : [question];
      localStorage.setItem("history", JSON.stringify(history));
      setrecentlyhistroy(history);
    }

    const payloadData = question ? question : selecthistory;
    const payload = {
      contents: [
        {
          parts: [
            {
              text: payloadData,
            },
          ],
        },
      ],
    };

    setloader(true);

    let response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    response = await response.json();
    let datastring = response.candidates[0].content.parts[0].text;
    datastring = datastring.split("* ").map((item) => item.trim());

    setresult([
      ...result,
      { type: "q", text: question ? question : selecthistory },
      { type: "a", text: datastring },
    ]);

    setquestion("");
    setTimeout(() => {
      ScrollAns.current.scrollTop = ScrollAns.current.scrollHeight;
    }, 500);
    setloader(false);
  }

  function isEnter(e) {
    if (e.key === "Enter") {
      askquestion();
    }
  }

  useEffect(() => {
    askquestion();
  }, [selecthistory]);

  // Dark mode toggle
  const [darkmode, setdarkmode] = useState("dark");
  useEffect(() => {
    if (darkmode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkmode]);

  return (
    <div className={darkmode === "dark" ? "dark" : "light"}>
      <div className="grid grid-cols-5 h-screen">
        {/* Dark mode selector */}
        <select
          id="select"
          value={darkmode}
          onChange={(e) => setdarkmode(e.target.value)}
          className="fixed text-white bottom-0 p-2 z-50 bg-zinc-700 rounded"
        >
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>

        {/* Sidebar */}
        <Recentsearch
          recentlyhistroy={recentlyhistroy}
          setrecentlyhistroy={setrecentlyhistroy}
          setSelecthistory={setSelecthistory}
        />

        {/* Main Chat Area */}
        <div className="right part col-span-4 p-10 text-center">
          {/* Welcome Text (only at start) */}
          {result.length === 0 && !loader && (
            <h1 className="mb-3 text-4xl bg-gradient-to-r from-violet-900 via-violet-700 to-violet-900 text-transparent bg-clip-text">
              Hello user, Ask me Anything...
            </h1>
          )}

          {/* ✅ Original Purple Loader */}
          {loader && (
            <div role="status" class="mb-1">
              <svg
                aria-hidden="true"
                class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          )}

          {/* Answer Section */}
          <div
            ref={ScrollAns}
            className="container h-98  overflow-scroll px-10 py-7 no-scrollbar"
          >
            <div className="text-zinc-200">
              <ul>
                {result.map((item, index) => (
                  <QuestionAns key={index} item={item} index={index} />
                ))}
              </ul>
            </div>
          </div>

          {/* Input Field */}
          <div className="bg-zinc-800 w-1/2 p-1 m-auto rounded-4xl border text-white border-zinc-700 flex mt-10 items-center">
  <input
    value={question}
    onKeyDown={isEnter}
    onChange={(e) => setquestion(e.target.value)}
    type="text"
    placeholder="Ask me anything"
    className="w-full h-full p-3 outline-none placeholder:text-gray-400  placeholder:text-sm"
  />

  {loader ? (
    // Spinner instead of button
    <svg
      className="animate-spin h-5 w-5 text-purple-500 mx-3"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
  ) : (
    //  Ask Button
    <button onClick={askquestion} className="pr-4 active:scale-95">
      Ask
    </button>
  )}
</div>

        </div>
      </div>
    </div>
  );
}

export default App;
