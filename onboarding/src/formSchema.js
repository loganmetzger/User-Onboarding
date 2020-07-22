import * as yup from 'yup'

const formSchema = yup.object().shape({
    name: yup
        .string(),
    email: yup
        .string(),
    password: yup
        .string(),
    terms: yup
        .string()
})


export default formSchema