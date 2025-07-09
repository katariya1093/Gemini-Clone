import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {checkheading,replaceheading } from "../helper";
import {useState} from "react";
import { useEffect } from "react";
import ReactMarkdown from 'react-markdown'
function Answer({ans,index}){
   
    const[heading,setheading]=useState(false);
    const[answer,setanswer]=useState(ans);
    useEffect(()=>{
             if(checkheading(ans)){
                setheading(true);
                setanswer(replaceheading(ans));
             }
             
    },[]);
    const renderer={
        code({node,inline,className,children,...props}){
            const match= /language-(\w+)/.exec(className || "");
            return !inline && match ? (
                <SyntaxHighlighter
                {...props}
                children={String(children).replace(/\n$/,'')}
                language={match[1]}
                style={nightOwl}
                preTag="div"
                />
            ):(
                <code {...props} className={className}>
                    {children}
                </code>
            )
        }
    }

    return(<>

       
        {heading?<span class="pt-2 text-lg block">{answer}</span>:<span class="text-sm">
            <ReactMarkdown components={renderer}>{answer}</ReactMarkdown>
            
            </span> }
           
           
    </>);
}
export default Answer;