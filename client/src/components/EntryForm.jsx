import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { Formik } from "formik"
import * as Yup from "yup"
import axios from "axios"

export default function EntryForm(props) {

  const handlePostRequest = (values) => {
    axios.post("entries", values)
      .then(res => { props.addJournalEntry(res.data) });
  }

  const handlePutRequest = (values) => {
    axios.put(`entries/${props.entryID}`, values)
      .then(res => { props.updateJournalEntry(props.entryID, res.data) });
    props.toggleModal();
  }

  const getInitialValues = () => {
    if (props.initialValues) return { ...props.initialValues };
    else return {
      place: "",
      country: "",
      startDate: "",
      endDate: "",
      description: ""
    }
  }

  return (
    <Formik
      initialValues={ getInitialValues() }
      validationSchema={Yup.object({
        place: Yup.string()
          .required("Required"),
        country: Yup.string()
          .required("Required"),
        startDate: Yup.date()
          .required("Required"),
        endDate: Yup.date()
          .required("Required")
          .min(Yup.ref("startDate"), "Date must be after start date"),
        description: Yup.string()
          .required("Required")
      })}
      onSubmit={ (values, { setSubmitting }) => {
        if (props.requestMethod === "post") handlePostRequest(values);
        else if (props.requestMethod === "put") handlePutRequest(values);
        setSubmitting(false);
      } }
    >
      {formik => (
        <Form noValidate className='mt-4 d-flex flex-column justify-content-center' id="create-new-form" onSubmit={formik.handleSubmit} >
          <Form.Group className="mb-3" controlId='formLocation'>
            <Form.Label>Location</Form.Label>
            <Form.Control 
              type='text' 
              size='lg' 
              name="place" 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}  
              value={formik.values.place} 
              placeholder='Ex: Mount Fuji'
              isValid={formik.touched.place && !formik.errors.place}
              isInvalid={formik.touched.place && Boolean(formik.errors.place)}
              />
            <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>{formik.errors.place}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId='formCountry'>
            <Form.Label>Country</Form.Label>
            <Form.Control 
              type="text" 
              size="lg" 
              name="country" 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} 
              value={formik.values.country} 
              placeholder="Ex: Japan" 
              isValid={formik.touched.country && !formik.errors.country}
              isInvalid={formik.touched.country && Boolean(formik.errors.country)}
              />
            <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>{formik.errors.country}</Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex">
            <Form.Group className="mb-3 me-auto form-date-container" controlId='formStartDate'>
              <Form.Label>Start Date</Form.Label>
              <Form.Control 
                type="date" 
                size="lg" 
                name="startDate" 
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur} 
                value={formik.values.startDate} 
                isValid={formik.touched.startDate && !formik.errors.startDate}
                isInvalid={formik.touched.startDate && Boolean(formik.errors.startDate)}
                />
              <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>{formik.errors.startDate}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 form-date-container" controlId='formEndDate'>
              <Form.Label>End Date</Form.Label>
              <Form.Control 
                type="date" 
                size="lg" 
                name="endDate" 
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur} 
                value={formik.values.endDate} 
                isValid={formik.touched.endDate && !formik.errors.endDate}
                isInvalid={formik.touched.endDate && Boolean(formik.errors.endDate)}
                />
              <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>{formik.errors.endDate}</Form.Control.Feedback>
            </Form.Group>
          </div>
          

          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={5} 
              name="description" 
              onChange={formik.handleChange} 
              onBlur={formik.handleBlur} 
              value={formik.values.description} 
              placeholder="Describe your experience here..." 
              isValid={formik.touched.description && !formik.errors.description}
              isInvalid={formik.touched.description && Boolean(formik.errors.description)}
              />
            <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>{formik.errors.description}</Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit" size="lg" className='form--btn align-self-center'>
            Submit
          </Button>

        </Form>
      )}
    </Formik>
  )
}

