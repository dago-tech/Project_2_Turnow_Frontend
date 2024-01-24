import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getData, postData, putData } from "../../../helpers/axios";
import { errorMessage } from "../../../helpers/errorMessage";
import { SendClearButtons } from "../../dataTable/SendClearButtons";

export function PriorityCreateEdit({ edit }) {
  /* Shows a form to create o edit a priority register */

  const endpoint = "priority/create/";
  const history = useNavigate();
  const { id } = useParams();
  const initialFormData = {
    name: "",
    description: "",
    priority: 0,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState("");

  useEffect(() => {
    if (edit) {
      getData("priority/get/" + id)
        .then((response) => {
          setFormData({
            ...formData,
            ["name"]: response.name,
            ["description"]: response.description,
            ["priority"]: response.priority,
          });
          setError(null);
        })
        .catch((error) => {
          setError(errorMessage(error));
        });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (formData.name == "") {
      setError("¡You did not fill out all the fields!");
      return;
    }
    // Clean ErrorForm if no validation issues
    setError("");

    if (edit) {
      putData(`priority/update/` + id + "/", {
        name: formData.name,
        description: formData.description,
        priority: formData.priority,
      })
        .then(() => {
          history({
            pathname: "/user_admin/priority/",
          });
        })
        .catch((error) => {
          setError(errorMessage(error));
        });
    } else {
      postData(endpoint, formData)
        .then(() => {
          history({
            pathname: "/user_admin/priority/",
          });
        })
        .catch((error) => {
          setError(errorMessage(error));
        });
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
  };

  return (
    <div className="center">
      <h1 className="create-edit-title">Priority</h1>
      <p>(The higher the number, the higher the priority)</p>
      <form>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={formData.name}
        />
        <br />
        <label htmlFor="description">Description: </label>
        <input
          type="text"
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={formData.description ?? ""}
        />
        <br />
        <label htmlFor="priority">Priority (0 to 20 number): </label>
        <input
          type="text"
          name="priority"
          placeholder="0 to 20 number"
          onChange={handleChange}
          value={formData.priority}
        />
        <br />
        <SendClearButtons
          handleSubmit={handleSubmit}
          handleReset={handleReset}
        />
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
