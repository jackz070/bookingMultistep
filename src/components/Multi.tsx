import { useState } from "react";
import { Form, Field, useForm, useFormState } from "react-final-form";
import arrayMutators from "final-form-arrays";
import { FieldArray } from "react-final-form-arrays";

const pages = [
  { number: 1, title: "Choose your tickets" },
  { number: 2, title: "Pick your seats" },
  { number: 3, title: "Personal Info" },
  { number: 4, title: "Summary" },
];

const Multi = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleNextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onSubmit = (values: any) => {
    console.log(values);
  };

  //validators
  const [hasError, setHasError] = useState(true);
  const required = (value: any) => (value ? undefined : "Required");

  return (
    <div className="h-full">
      <div className="w-full h-2 bg-red-200">
        <div
          className={`bg-red-800 h-full`}
          style={{ width: `${(currentPage / pages.length) * 100}%` }}
        />
      </div>
      <div>Page counter: {currentPage}</div>
      <div className="h-4/5">
        <div>
          <Form
            onSubmit={onSubmit}
            mutators={{
              ...arrayMutators,
            }}
            render={({
              handleSubmit,
              form,
              form: {
                mutators: { push, pop },
              },
              submitting,
              pristine,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                {currentPage === 1 && (
                  <div>
                    {pages[0].title}
                    <div className="p-4">
                      <div>
                        <div className="mb-12 flex flex-col items-start gap-1">
                          <label>Pick your tickets</label>
                          <div className="buttons">
                            <button
                              type="button"
                              onClick={() => push("tickets", undefined)}
                            >
                              Add Ticket
                            </button>
                            <button
                              type="button"
                              onClick={() => pop("tickets")}
                            >
                              Remove Ticket
                            </button>
                          </div>
                          <FieldArray name="tickets">
                            {({ fields }) =>
                              fields.map((ticket, index) => (
                                <div key={ticket}>
                                  <label>Ticket #{index + 1}</label>
                                  <Field
                                    name={`tickets.${index}`}
                                    component="select"
                                    placeholder="First Name"
                                    initialValue="Full Price"
                                  >
                                    <option>Full Price</option>
                                    <option>Reduced Price</option>
                                  </Field>
                                  <span
                                    onClick={() => fields.remove(index)}
                                    style={{ cursor: "pointer" }}
                                  >
                                    ❌
                                  </span>
                                </div>
                              ))
                            }
                          </FieldArray>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {currentPage === 2 && (
                  <div>
                    {pages[1].title}
                    <div>
                      <label>Hobby</label>
                      <Field
                        name="hobby"
                        component="input"
                        type="text"
                        placeholder="Hobby"
                        className="bg-gray-200 p-1 m-2 "
                      />
                    </div>
                  </div>
                )}
                {currentPage === 3 && (
                  <div>
                    {pages[2].title}
                    <div className="flex flex-col">
                      <label>Enter your information</label>
                      <Field
                        name="testy"
                        validate={required}
                        render={({ input, meta }) => (
                          <div>
                            <input
                              placeholder="test"
                              className="bg-gray-200 p-1 m-2"
                              {...input}
                            ></input>
                            {meta.touched && meta.error && <span>ERROR</span>}
                          </div>
                        )}
                      />
                      <Field
                        name="firstName"
                        component="input"
                        type="text"
                        placeholder="First Name"
                        className="bg-gray-200 p-1 m-2 "
                        validate={required}
                      />

                      <Field
                        name="lastName"
                        component="input"
                        type="text"
                        placeholder="Last Name"
                        className="bg-gray-200 p-1 m-2 "
                        validate={required}
                      />
                    </div>
                  </div>
                )}
                {currentPage === 4 && (
                  <div>
                    {pages[3].title} {values.firstName} {values.lastName}
                  </div>
                )}

                <div className="flex gap-4">
                  <button type="submit">SUBMIT</button>
                  <button onClick={() => handlePrevPage()}>prev</button>
                  <button
                    type="submit"
                    onClick={() => handleNextPage()}
                    disabled={hasError}
                  >
                    next
                  </button>
                </div>
              </form>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Multi;
