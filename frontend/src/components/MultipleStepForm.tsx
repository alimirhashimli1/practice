import { useEffect, useReducer, useState } from "react";

interface FormState {
  step: number;
  name: string;
  email: string;
  country: string;
  city: string;
  zip: string;
  password: string;
  confirmPassword: string;
  errors: Partial<Record<keyof Omit<FormState, "step" | "errors">, string>>;
}

type Action =
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | {
      type: "UPDATE_FIELD";
      field: keyof Omit<FormState, "step" | "errors">;
      value: string;
    }
  | { type: "VALIDATE" }
  | { type: "SUBMIT" };

const initialState: FormState = {
  step: 1,
  name: "",
  email: "",
  country: "",
  city: "",
  zip: "",
  password: "",
  confirmPassword: "",
  errors: {},
};
function reducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
        errors: { ...state.errors, [action.field]: "" }, // Clear error on field update
      };


    case "VALIDATE": {
      const errors: Partial<FormState> = {};
      if (state.step === 1) {
        if (!state.name.trim()) errors.name = "Name is required";
        if (!state.email.match(/^\S+@\S+\.\S+$/))
          errors.email = "Email must be valid";
      }

      if (state.step === 2) {
        if (!state.country.trim()) errors.country = "Country is required";
        if (!state.city.trim()) errors.city = "City is required";
        if (!state.zip.match(/^\d{4,}$/))
          errors.zip = "Zip code must be at least 4 digits";
      }

      if (state.step === 3) {
        if (state.password.length < 6)
          errors.password = "Password must be at least 6 characters";
        if (state.password !== state.confirmPassword)
          errors.confirmPassword = "Passwords do not match";
      }

      return { ...state, errors };
    }

    case "NEXT_STEP":
      return { ...state, step: state.step + 1 };

    case "PREV_STEP":
      return { ...state, step: state.step - 1 };

    case "SUBMIT":
      return state;

    default:
      return state;
  }
}

const MultiStepForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [submitText, setSubmitText] = useState<string>("");


  useEffect(() => {
    if (Object.keys(state.errors).length === 0) {
      dispatch({ type: "NEXT_STEP" });
    }
  }, [state.errors]);
  const handleNext = () => {
    dispatch({ type: "VALIDATE" });
    console.log(Object.keys(state.errors).length);

  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission behavior
    dispatch({ type: "VALIDATE" });

    if (Object.keys(state.errors).length === 0) {
      setSubmitText("Your credentials has been submitted! Thanks!");
    }
  };

  return (
    
   <>
    {
      !submitText ? 
      
      <form onSubmit={handleSubmit}>
      <h2>Multi-Step Form</h2>
      <p>Step {state.step} of 3</p>

      {state.step === 1 && (
        <div>
          <input
            type="text"
            placeholder="Name"
            value={state.name}
            onChange={(e) =>
              dispatch({ type: "UPDATE_FIELD", field: "name", value: e.target.value })
            }
          />
          {state.errors.name && <span style={{ color: "red" }}>{state.errors.name}</span>}

          <input
            type="email"
            placeholder="Email"
            value={state.email}
            onChange={(e) =>
              dispatch({ type: "UPDATE_FIELD", field: "email", value: e.target.value })
            }
          />
          {state.errors.email && <span style={{ color: "red" }}>{state.errors.email}</span>}
        </div>
      )}

      {state.step === 2 && (
        <div>
          <input
            type="text"
            placeholder="Country"
            value={state.country}
            onChange={(e) =>
              dispatch({ type: "UPDATE_FIELD", field: "country", value: e.target.value })
            }
          />
          {state.errors.country && <span style={{ color: "red" }}>{state.errors.country}</span>}

          <input
            type="text"
            placeholder="City"
            value={state.city}
            onChange={(e) =>
              dispatch({ type: "UPDATE_FIELD", field: "city", value: e.target.value })
            }
          />
          {state.errors.city && <span style={{ color: "red" }}>{state.errors.city}</span>}

          <input
            type="text"
            placeholder="Zip code"
            value={state.zip}
            onChange={(e) =>
              dispatch({ type: "UPDATE_FIELD", field: "zip", value: e.target.value })
            }
          />
          {state.errors.zip && <span style={{ color: "red" }}>{state.errors.zip}</span>}
        </div>
      )}

      {state.step === 3 && (
        <div>
          <input
            type="password"
            placeholder="Password"
            value={state.password}
            onChange={(e) =>
              dispatch({ type: "UPDATE_FIELD", field: "password", value: e.target.value })
            }
          />
          {state.errors.password && <span style={{ color: "red" }}>{state.errors.password}</span>}

          <input
            type="password"
            placeholder="Confirm Password"
            value={state.confirmPassword}
            onChange={(e) =>
              dispatch({ type: "UPDATE_FIELD", field: "confirmPassword", value: e.target.value })
            }
          />
          {state.errors.confirmPassword && (
            <span style={{ color: "red" }}>{state.errors.confirmPassword}</span>
          )}
        </div>
      )}

      <div>
        {state.step > 1 && <button type="button" onClick={() => dispatch({ type: "PREV_STEP" })}>Back</button>}
        {state.step < 3 && <button type="button" onClick={handleNext}>Next</button>}
        {state.step === 3 && <button type="submit">Submit</button>}
      </div>
    </form>
    :
    <div>{submitText}</div>
      
    }
   </>
  );
};

export default MultiStepForm;
