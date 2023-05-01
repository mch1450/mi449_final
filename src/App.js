import { React, useState } from "react";
import Axios from "axios";
import "./App.css";
import axios from 'axios';
  
function App() {

	const owlbot = axios.create({
		baseURL: "https://cors-anywhere.herokuapp.com/https://owlbot.info/api/v4/dictionary/",
		timeout: 1000,
		headers: {
		  "Authorization": `Token 99a37e49b0af9a7edd103a630faad415fa0b92f0` 
		}
	  })
	
	  const [data, setData] = useState("");
	  const [data2, setData2] = useState([]); 
	  const [searchWord, setSearchWord] = useState("");
	
	  const Definition = (props) => (
		<div >		
			<h2>{props.em}</h2>
			{props.eg != null && <p className="italic">{props.type}</p>}
			
			<p>{props.def}</p>
			{props.eg != null && <p>Example: <span className="italic">{props.eg}</span></p>}
		</div>
	  )
	
	function getMeaning() {
		Axios.get(
		`https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchWord}`
		).then((response) => {
		setData(response.data[0]);
		});

		owlbot.get(searchWord).then((response) => {
			console.log(response);
			setData2(response.data.definitions)
		});
	}

	function playAudio() {
		let audio = new Audio(data.phonetics[0].audio);
		audio.play();
	}


	return (
		<div className="App min-h-screen bg-gradient-to-r from-slate-900 to-blue-700 bg-gradient-to-b mx-auto pb-10">
		<div className="py-8">
		<h1 className="animatecss animatecss-fadeIn text-4xl font-bold text-center text-white mt-10">English Dictionary</h1>

		<p className="animatecss animatecss-fadeIn italic text-center text-white mt-2">Press enter key or the search button to continue</p>
		<p className="animatecss animatecss-fadeIn text-center text-white mt-1">Showing results for: <span className="italic">{searchWord}</span></p>
			

		<div className="animatecss animatecss-slideInUp">
			<div className="mb-5">
			<div className="relative mb-7 flex flex-wrap items-stretch mt-5 mx-20">
				<input
				type="search"
				className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
				placeholder="Search Word.."
				
				onChange={(e) => {
					setSearchWord(e.target.value);
				}}
				onKeyUp={(e) => {
					if (e.key === "Enter"){
						getMeaning();
					}
				}}
				/>

				<button
				className="relative z-[2] flex items-center rounded-r bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
				type="button"
				onClick={() => {getMeaning();}}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					className="h-5 w-5">
					<path
					fillRule="evenodd"
					d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
					clipRule="evenodd" />
				</svg>
				</button>
				</div>
			</div>	
		</div>

		{data && (
			<div className="bg-white px-10 py-6 rounded-3xl bg-opacity-70 mx-20 animatecss animatecss-slideInUp">
				<h2><span className="font-bold text-3xl">{data.word} </span> {data.phonetic}
					<button onClick={() => {playAudio();}}><svg className="translate-y-1" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg></button>
				</h2>
				<p className="italic">{data.meanings[0].partOfSpeech}</p>

				<p>{data.meanings[0].definitions[0].definition}</p>

				{data.meanings[0].definitions[0].example != null && <p>Example: <span className="italic">{data.meanings[0].definitions[0].example}</span></p>}

			</div>
		)}
		</div>
		{data && (
			<div className="bg-white px-10 py-6 rounded-3xl bg-opacity-70 mx-20 animatecss animatecss-slideInUp">		
						<h2><span className="font-bold text-3xl">Owlbot Definition</span></h2>
						{ data2.map((def, index) => <Definition key={index} type={def.type} def={def.definition} em={def.emoji} eg={def.example}></Definition>) }
			</div>
		)}
		</div>
	);
}

export default App;
