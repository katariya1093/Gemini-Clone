function Recentsearch({recentlyhistroy,setrecentlyhistroy , setSelecthistory}) {
    function clearhistory(){
     localStorage.clear();
     setrecentlyhistroy([]);
  }
  return (
    <>
      <div class="left part  col-span-1 bg-zinc-800 h-screen pt-3">
        <h1 class="text-zinc-200  mb-3 text-xl flex ">
          <span class="pl-2 pb-1">Recent History</span>
          <button onClick={clearhistory} class=" item-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#e3e3e3"
            >
              <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" />
            </svg>
          </button>
        </h1>
        <hr></hr>
        <ul>
          {recentlyhistroy &&
            recentlyhistroy.map((item,index) => (
              <li
                key={index}
                onClick={() => setSelecthistory(item)}
                class="text-zinc-400 cursor-pointer truncate hover:text-zinc-200 hover:bg-zinc-600 px-2 mt-2 text-sm"
              >
                {item}{" "}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
export default Recentsearch;
