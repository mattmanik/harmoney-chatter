import { useEffect, useState } from "react"
import msgIcon from "../assets/message.svg"
import { formattedTime, sortedData } from "./helpers";

function MessageBoard() {

    const [message, setMessage] = useState("");
    const [data, setData] = useState([]);
    const [deleteMsgId, setDeleteMsgId] = useState<any>();
    const [showingLatest, setShowingLatest] = useState(true);


    const handlePostRequest = async () => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "zDAFIz8rXCV7Y_PV",
                },
                body: JSON.stringify({ text: message }),
            };

            const response = await fetch("https://mapi.harmoney.dev/api/v1/messages/", requestOptions);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            } else {
                const responseData = await response.json();
                console.log('Response data:', responseData);
                setMessage("")
                getData();
            }
        } catch (error) {
            console.error('Post request error:', error);
        }
    };

    const handleDeleteRequest = async (id: number) => {
        try {
            const requestOptions = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "zDAFIz8rXCV7Y_PV",
                },
                body: JSON.stringify({ text: message }),
            };

            const response = await fetch(`https://mapi.harmoney.dev/api/v1/messages/${id}`, requestOptions);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            } else if (response.ok) {
                getData()
            }
        } catch (error) {
            console.error('Post request error:', error);
        }
    };

    function getData() {
        fetch("https://mapi.harmoney.dev/api/v1/messages/",
            {
                headers: {
                    "Authorization": "zDAFIz8rXCV7Y_PV"
                }
            })
            .then(res => res.json())
            .then((response) => {
                setData(response)
            })
    }

    useEffect(() => {
        getData()
    }, []);


    return (
        <div className="p-4">
            <h1>Chatter</h1>
            <h3>type something in box below, then hit "Post"</h3>
            <div className="w-[36rem] my-[1rem] flex items-center justify-between">
                <input value={message} onChange={(e) => setMessage(e.target.value)} className="border-black p-2 border" />
                <div
                    onClick={handlePostRequest}
                    className="p-2 border border-black py-0 cursor-pointer">Post!</div>
                <div className="p-2 border border-black py-0 cursor-pointer text-red-500">Delete All</div>
                <div className="p-2 border border-black py-0 cursor-pointer" onClick={() => { setShowingLatest(!showingLatest); setData([...data].reverse()) }}>
                    {showingLatest ? "Sort: Latest" : "Sort: Old"}
                </div>
            </div>
            {data.map((msg: { text: string, source: string, id: number, timestamp: string }, index) => <div>
                {index ? <hr className="w-[50%]" /> : <></>}
                <div className="flex mt-[1rem] items-center">
                    <img src={msgIcon} className="w-[24px] h-[24px]" />
                    <h3 className="font-semibold !opacity-[100%] text-[16px] ml-4">~ {msg?.source}</h3>
                    <h3 className="font-700 text-sm !opacity-[50%] ml-4">{formattedTime(msg?.timestamp)}</h3>
                    <div className="underline text-blue-700 ml-4 cursor-pointer"
                        onClick={() => setDeleteMsgId(msg?.id)}>
                        Delete
                    </div>
                    {deleteMsgId == msg?.id ? <div className="ml-6">You sure you want to delete this ?
                        <span className="ml-6 cursor-pointer text-blue-700"
                            onClick={() => handleDeleteRequest(msg?.id)}>Yes</span>
                        <span className="ml-6 cursor-pointer text-blue-700" onClick={() => setDeleteMsgId(null)}>
                            No
                        </span>
                    </div> : <></>}
                </div>
                <h3 className="ml-8 mt-[8px] mb-[1rem]">{msg?.text ?? ""}</h3>
            </div>)}

        </div>
    )
}

export default MessageBoard