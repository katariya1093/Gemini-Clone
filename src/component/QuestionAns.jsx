import Answer from "./Answer.jsx"
function QuestionAns({item,index}){
    return(<>
    <div
                  key={index + Math.random()}
                  class={item.type == "q" ? "flex justify-end mt-3 mb-3" : ""}
                >
                  {item.type == "q" ? (
                    <li
                      key={index + Math.random()}
                      class="text-right p-2 border-5 border-zinc-700 w-fit bg-zinc-700  rounded-tl-3xl rounded-bl-3xl rounded-br-3xl"
                    >
                      <Answer ans={item.text} />
                    </li>
                  ) : (
                    item.text.map((answeritem, itemindex) => (
                      <li
                        key={itemindex + Math.random()}
                        class="text-left p-1"
                      >
                        <Answer ans={answeritem}/>
                      </li>
                    ))
                  )}
                </div>
    
    </>)
}
export default QuestionAns;