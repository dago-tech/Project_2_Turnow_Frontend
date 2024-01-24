import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getData, postData, patchData } from "../../../helpers/axios";
import { errorMessage } from "../../../helpers/errorMessage";
import { SendClearButtons } from "../../SendClearButtons";

export function TurnCreateEdit({ edit }) {
  /* Shows a form to create o edit a turn register */

  const endpoint = "turn/create/";
  const history = useNavigate();
  const { id } = useParams();

  const initialFormData = {
    state: "pending",
    personal_id: "",
    category: "",
    priority: "",
    desk: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [clientOptions, setClientOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [priorityOptions, setPriorityOptions] = useState([]);
  const [deskOptions, setDeskOptions] = useState([]);
  const [error, setError] = useState("");

  const currentPath = location.pathname.split("/")[1];
  let destinationPath = "";

  useEffect(() => {
    getData("client/")
      .then((response) => {
        setClientOptions(response);
        return getData("category/");
      })
      .then((response) => {
        setCategoryOptions(response);
        return getData("priority/");
      })
      .then((response) => {
        setPriorityOptions(response);
        return getData("desk/");
      })
      .then((response) => {
        setDeskOptions(response);
      })
      .catch((error) => {
        setError(errorMessage(error));
      });

    if (edit) {
      getData("turn/get/" + id)
        .then((response) => {
          setFormData({
            ...formData,
            ["state"]: response.state,
            ["personal_id"]: response.personal_id,
            ["category"]: response.category,
            ["priority"]: response.priority,
            ["desk"]: response.desk || "",
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

  const handleChangeFk = (e) => {
    const { name, value } = e.target;
    if (value == "") {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: parseInt(value, 10),
      });
    }
  };

  const handleSubmit = () => {
    if (
      formData.personal_id == "" ||
      formData.category == "" ||
      formData.priority == ""
    ) {
      setError("¡You did not fill out all the fields!");
      return;
    }
    // Clean ErrorForm if no validation issues
    setError("");

    //Set destination path based on current path
    if (currentPath == "user_desk") {
      destinationPath = `/user_desk/turn`;
    } else {
      destinationPath = `/user_admin/turn`;
    }

    if (edit) {
      patchData(`turn/update/` + id + "/", {
        state: formData.state,
        personal_id: formData.personal_id,
        category: formData.category,
        priority: formData.priority,
        desk: formData.desk,
      })
        .then(() => {
          history({
            pathname: destinationPath,
          });
        })
        .catch((error) => {
          setError(errorMessage(error));
        });
    } else {
      postData(endpoint, formData)
        .then(() => {
          history({
            pathname: destinationPath,
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
      <h1 className="create-edit-title">Turn</h1>
      <form>
        <label htmlFor="state">State: </label>
        <select
          id="state"
          name="state"
          onChange={handleChange}
          value={formData.state}
        >
          <option value="pending">Pending</option>
          <option value="serving">Serving</option>
          <option value="served">Served</option>
          <option value="first to serve">First to serve</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <br />
        <label htmlFor="personal_id">Client:</label>
        <select
          id="personal_id"
          name="personal_id"
          value={formData.personal_id}
          onChange={handleChangeFk}
        >
          <option value="">Select...</option>
          {clientOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.personal_id}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChangeFk}
        >
          <option value="">Select...</option>
          {categoryOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>

        <br />
        <label htmlFor="priority">Priority:</label>
        <select
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleChangeFk}
        >
          <option value="">Select...</option>
          {priorityOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="desk">Desk:</label>
        <select
          id="desk"
          name="desk"
          value={formData.desk}
          onChange={handleChangeFk}
        >
          <option value="">Select...</option>
          {deskOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
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
