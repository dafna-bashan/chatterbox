import React from 'react'

export function AddMsg({ msg, handleChange, sendMsg }) {
    return (
        <div className="add-msg">
            <form onSubmit={sendMsg} className="flex">
                <input className="full" type="text" name="txt" placeholder="Type a message" value={msg.txt} autoComplete="off" onChange={handleChange} />
                <button>Send</button>
            </form>
        </div>
    )
}
