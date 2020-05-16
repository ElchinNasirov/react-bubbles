import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        updateColors([...colors.filter(color => color.id !== colorToEdit.id), res.data])
      })
      .catch(err => {
        console.log("Err is ", err)
      })
    setEditing(false)
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then(res => {
        updateColors([...colors.filter(color => color.id !== res.data)])
      })
      .catch(err => {
        console.log("Err is ", err)
      })
    setEditing(false)
  };

  const handleChange = e => {
    setNewColor({
      ...newColor,
      [e.target.name]: e.target.value
    })
  }

  const handleHexChange = e => {
    setNewColor({
      ...newColor,
      code: { hex: e.target.value }
    })
  }

  const addNewColor = e => {
    e.preventDefault();

    axiosWithAuth()
      .post('/api/colors', newColor)
      .then(res => {
        axiosWithAuth()
          .get('/api/colors')
          .then(res => {
            updateColors(res.data)
          })
          .catch(err => {
            console.log(err)
          })
      })

  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                e.stopPropagation();
                deleteColor(color)
              }
              }>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>

          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>

          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}

      <form onSubmit={addNewColor}>
        <label>Add New Color(s)</label>
        <input
          type="text"
          name="color"
          placeholder="color name"
          onChange={handleChange}
        />

        <input
          type="text"
          name="hex"
          placeholder="color code"
          onChange={handleHexChange}
        />
        <button> Add new color </button>
      </form>

      <div className="spacer" />
      {/* stretch - build another form here to add a color */}

      <div>
      </div>
    </div>
  );
};

export default ColorList;
