import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import db from '../../firebase';
import './Todolist.css';

const Todolist = () => {
    const [workInfo, setWorkInfo] = useState('');
    const [workList, setWorkList] = useState([]);
    const [update, setUpdate] = useState(false);

    useEffect(()=>{
       db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot =>{
           setWorkList(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data()})));
       })
    },[])
    const handleSubmit =(event) => {
        event.preventDefault();
        if(workInfo !== ''){
        db.collection('todos').add({
            ...workInfo,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
    }
        setWorkInfo('');
    }
    const handleUpdateSubmit = (id)=>{
        if(workInfo !== ''){
            db.collection('todos').doc(id).set({
                ...workInfo
            }, {merge: true})
        }
        setWorkInfo('');
    }
    const handleOnChange = (event) =>{
        const newWork = {...workInfo};
        if(event.target.name === 'todo'){
            newWork.todo = event.target.value;
        }
        else if(event.target.name === 'dateTime'){
            newWork.dateTime = event.target.value;
        }
        setWorkInfo(newWork);
    }
    const handleUpdateChange = (event) => {
        const newWork = {...workInfo};
        if(event.target.name === 'todo'){
            newWork.todo = event.target.value;
        }
        else if(event.target.name === 'dateTime'){
            newWork.dateTime = event.target.value;
        }
        setWorkInfo(newWork);
    }
    return (
        <section className="todolist">
            <form onSubmit={handleSubmit}>
                <label htmlFor="workname" className="font-weight-bold mr-2">Work Name</label>
                <input className="input-field work-input-field" type="text" onChange={handleOnChange} id="workname" name="todo" placeholder="Name" required/>
                <label for="dateTime" class="font-weight-bold mr-2">Date &amp; Time</label>
                <input class="input-field" type="datetime-local" onChange={handleOnChange} id="datetime" name="dateTime" />
            <button className="add-btn" type="submit">Add To List</button>
           </form><br/>
           <h3>Your Total work remainings : {workList.length}</h3>
           {
               workList.map(work => (
                <div className="work-list">
                  <p className="text-design">Work Name: {work.todo.todo}</p>
                  <p className="text-design">Work Schedule: {work.todo.dateTime}</p>
                  <button onClick={()=> db.collection('todos').doc(work.id).delete()} className="btn btn-dark">Done job</button>
                  <button onClick={()=>setUpdate(!update)} className="btn btn-dark mx-3">Update</button>
                  <div className="my-3"> 
                  {
                      update ?
                      <div> 
                      <form>
                      <label htmlFor="workname" className="font-weight-bold mr-2">Work Name</label>
                      <input className="input-field work-input-field" type="text" onChange={handleUpdateChange} id="workname" name="todo" placeholder="Name" required/><br />
                      <label for="dateTime" class="font-weight-bold mr-2">Date &amp; Time</label>
                      <input class="input-field" type="datetime-local" onChange={handleUpdateChange} id="datetime" name="dateTime" /><br />
                   
                      </form>
                         <button className="add-btn" onClick={()=> handleUpdateSubmit(work.id)}>Update Todo</button>
                         </div>
                          :
                      <div> </div>
                  }
                   
                  </div>
                </div> 
                ))
           }
           
        </section>
    );
};

export default Todolist;