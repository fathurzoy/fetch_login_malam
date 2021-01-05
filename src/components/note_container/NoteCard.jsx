import { useState } from 'react'
import './NoteCard.css'

const NoteCard = ({ id, title, body}) => {

  //kita buat togler view untuk form edit
  const [showEditForm, setShowEditForm] = useState(false);  
  
  const [defaultValue, setDefaultValue] = useState({
    id: id,
    title: title,
    body: body,
  });

  const handleDelete = (args)=>{
    if (window.confirm("Yakin Mau Hapus?")) {
      fetch(`http://localhost:5000/notes/${args}`, {
      method: "DELETE",
      mode: 'cors',
      headers: {
        "Content-Type" : "application/json"
      },
    })
    window.location.href= "/home";
    } else {
      
    }
    
  }

  const handleEdit = (e)=>{
    // agar url tetap
    e.preventDefault();
    // alert(`
    //   user_email : ${addNote.user_email}
    //   title: ${addNote.title}
    //   body: ${addNote.body}
    // `)
    fetch(`http://localhost:5000/notes/${id}`, {
      method: "PATCH",
      mode: 'cors',
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        title: defaultValue.title,
        body: defaultValue.body,
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      alert(data)
      window.location.href = '/home'

    })
  }


  return (
    <section className="note_card" >
      <i className="fa fa-trash del_icon" onClick={() => {
        handleDelete(id)
      }}></i>
      <i className="fa fa-edit edit_icon" onClick={() => {
        setShowEditForm(!showEditForm)
      }}></i>

      {showEditForm === true ? (
      <form className="form_edit" onSubmit={handleEdit}>
        <label htmlFor="title">judul</label>
        <input type="text" id="title" name="title" value={defaultValue.title}
          onChange={(e)=>{
            e.preventDefault()
            setDefaultValue({
              ...defaultValue,
              title : e.target.value
            })
          }}
        />

        <label htmlFor="body">isi note</label>
        <textarea name="body" id="body" value={defaultValue.body}
        onChange={(e)=>{
          e.preventDefault()
          setDefaultValue({
            ...defaultValue,
            body : e.target.value
          })
        }}
        ></textarea>
        <button type="submit">simpan</button>
      </form> 
      ) : (
      <>      
        <h3 className="note_title">{title}</h3>
        <p className="note_body" dangerouslySetInnerHTML={{__html:body}}></p>
      </>
      )}
      
    </section>
  )
}

export default NoteCard;