import { useState } from 'react'
import axios from 'axios';
import './App.css';
import AceEditor from "react-ace";
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import spinner from './images/Spinner.gif';
function App() {
const [input, setInput] = useState('');
const [isCodeVisible, setIsCodeVisible] = useState(false);
const [data, setData] = useState({});
const [loading, setLoading] = useState(false);
const characterLimit = 10000;
const [count, setCount] = useState(0);

const [value, setValue] = useState("");
const [display, setDisplay] = useState({});

const handleSearch = async () => {
console.log("calling");
setLoading(true);
try {
const response = await axios.post(`https://let0oy5x2l.execute-api.ap-south-1.amazonaws.com/getCode`, {
code: input,
data: {
someKey: input,
  }
});
setData(response.data);
setIsCodeVisible(true);
let dat = response.data;
let substring = "if";
let c=0;
for (let i = 0; i < dat.length; i++) {
  if (dat.substr(i, substring.length) === substring) {
    c++;
  }
}
  setCount(c);
  

   

} catch (error) {
console.error(error);
} finally {
setLoading(false);

}


}

const handleChange = (event) => {
if (event.target.value.length <= characterLimit) {
setValue(event.target.value);
setInput(event .target.value);
}
};

return (
<div className="App">
<div>Ask RapidX to generate code</div>
<textarea className="input" placeholder="simply describe your requirement in a sentence or two........" value={input} onChange={handleChange} style={{ width: "800px",maxlength:"500"  , height :"100px" }}/>
<p>
{input.length}/{characterLimit} characters

</p>
  <button className="button" onClick={handleSearch}>Generate code</button>
{loading ? (
             <img src={spinner} alt="this is car image" />
) : (
<div className="App">
{isCodeVisible && (
<AceEditor
mode="javascript"
theme="monokai"
name="compiler-window"
value={(data.toString())}
fontSize={16} 
readOnly={true}
style={{ width: '350%', height: '400px', backgroundColor: 'black' }}
editorProps={{ $blockScrolling: true}}
setOptions={{
enableBasicAutocompletion:true,
enableSnippets:true,
enableLiveAutocompletion:false
}}

/>

)}
{count >= 4 ? (
      <div className="opti">  We Suggest you use Decorator design pattern</div>
    ) : (
      <div  >  </div>
    )}
<textarea value={JSON.stringify(data)} readOnly style={{width: '0%', height: '0', padding: '0', fontSize: '16px'}}/>
</div>
)}

</div>

);

}

export default App;