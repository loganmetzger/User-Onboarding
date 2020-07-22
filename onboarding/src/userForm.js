import React from 'react'

function UserForm(props) {

    const {
        values,
        submit,
        inputChange,
        checkboxChange,
        disabled,
        errors,
    } = props

    const onSubmit = evt => {
        evt.preventDefault()
        submit()
    }

    const onCheckboxChange = evt => {
        const { name, checked } = evt.target
        checkboxChange(name, checked)
    }

    const onInputChange = evt => {
        const { name, value } = evt.target
        inputChange(name, value)
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                <h2>Create New User</h2>

                <button disabled={disabled}>Submit</button>

                <div>
                    <div>{errors.name}</div>
                    <div>{errors.email}</div>
                    <div>{errors.password}</div>
                    <div>{errors.terms}</div>
                </div>
            </div>
            <div>
                <h4>General Information</h4>
                <label>Name&nbsp;
                    <input 
                        value={values.name}
                        onChange={onInputChange}
                        name='name'
                        type='text'
                    />
                </label>
                <label>Email
                    <input 
                        value={values.email}
                        onChange={onInputChange}
                        name='email'
                        type='text'
                    />
                </label>
                <label>Password
                    <input 
                        value={values.password}
                        onChange={onInputChange}
                        name='password'
                        type='text'
                    />
                </label>
                <label>Terms and Conditions
                    <input 
                        type='checkbox'
                        name='terms'
                        onChange={onCheckboxChange}
                        checked={values.terms.accepted === true}
                    />
                </label>
            </div>
        </form>
    )
}


export default UserForm