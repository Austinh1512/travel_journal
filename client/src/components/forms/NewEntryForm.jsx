import { useState, useContext, useEffect } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Thumbnail from "../Thumbnail"
import { Formik } from "formik"
import * as Yup from "yup"
import useAxiosInterceptors from "../../hooks/useAxiosInterceptors"
import AuthContext from "../../context/AuthContext"
import AlertContext from "../../context/AlertContext"
import useErrorHandler from "../../hooks/useErrorHandler"

const MAX_IMAGE_AMOUNT = 10;
const DESCRIPTION_CHAR_LIMIT = 500;

export default function EntryForm(props) {
  const { user } = useContext(AuthContext);
  const { setAlert } = useContext(AlertContext);
  const [ descriptionCharLeft, setDescriptionCharLeft ] = useState(DESCRIPTION_CHAR_LIMIT);
  const [ images, setImages ] = useState([]);
  const axios = useAxiosInterceptors();
  const handleError = useErrorHandler();

  const getInitialValues = () => {
    if (props.initialValues) return { ...props.initialValues };
    else return {
      place: "",
      country: "",
      startDate: "",
      endDate: "",
      description: "",
      images: []
    }
  }

  const displayThumbnails = () => {
    if (images.length) {
      return images.map((file, i) => <Thumbnail key={i} src={URL.createObjectURL(file)} index={i} setImages={setImages} />)
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
        .max(DESCRIPTION_CHAR_LIMIT, `Only a maximum of ${DESCRIPTION_CHAR_LIMIT} characters allowed`)
          .required("Required"),
        images: Yup.array()
          .min(1, "Share at least 1 photo from your journey")
          .max(MAX_IMAGE_AMOUNT, `Only a maximum of ${MAX_IMAGE_AMOUNT} photos can be shared`)
          .required("Required")
      })}
      onSubmit={ async (values, { resetForm }) => {
        const data = new FormData();

        data.append("values", JSON.stringify(values));
        data.append("user", JSON.stringify(user));

        images.forEach((img, i) => {
          data.append(`images[${i}]`, img)
        })
        
        try {
          const res = await axios.post("/entries", data, { headers: { "Content-Type": "multipart/form-data" } });
          setAlert({
            type: "success",
            message: "Successfully added entry!"
          });
          props.addJournalEntry(res.data);
          resetForm();
          props.toggle();
        } catch(err) {
          handleError(err);
        }
      }}

    >
      {formik => {
        // Sync state when user deletes a thumbnail
        useEffect(() => {
          formik.setFieldValue("images", images);
        }, [images])

        const handleDescriptionChange = (e) => {
          formik.setFieldValue("description", e.target.value );
          setDescriptionCharLeft(DESCRIPTION_CHAR_LIMIT - e.target.value.length);
        }

        return <Form noValidate className='mt-4 d-flex flex-column justify-content-center' id="create-new-form" encType="multipart/form-data" onSubmit={formik.handleSubmit} >
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
            <Form.Label>Description <small>({ descriptionCharLeft } character(s) remaining)</small></Form.Label>
            <Form.Control 
              as="textarea" 
              rows={5} 
              name="description" 
              onChange={handleDescriptionChange} 
              onBlur={formik.handleBlur} 
              value={formik.values.description} 
              placeholder="Describe your experience here..." 
              isValid={formik.touched.description && !formik.errors.description}
              isInvalid={formik.touched.description && Boolean(formik.errors.description)}
              />
            <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>{formik.errors.description}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formImages">
            <Form.Label>Images:</Form.Label>
            <Form.Control 
              type="file"
              multiple
              name="images" 
              onChange={(e) => {
                const file = e.target.files[0];
                setImages(prev => [...prev, file]);
                formik.setFieldValue("images", images);
              }}
              onBlur={formik.handleBlur} 
              isValid={formik.touched.images && !formik.errors.images}
              isInvalid={formik.touched.images && Boolean(formik.errors.images)}
            />
            <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>{formik.errors.images}</Form.Control.Feedback>
          </Form.Group>

          <div className="thumbnail-container">
            { displayThumbnails() }
          </div>
          

          <Button variant="primary" type="submit" size="lg" className='form--btn align-self-center'>
            Submit
          </Button>

        </Form>
      }}
    </Formik>
  )
}


