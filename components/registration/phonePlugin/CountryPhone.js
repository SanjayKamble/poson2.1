// Component for input value for country code and phone number


import PhoneInput from 'react-phone-number-input'

const CountryPhone = (props) => {

  const { name, onChange, value } = props;

  return (
    <div>
      <PhoneInput
        placeholder="Enter here"
        defaultCountry='IN'
        value={value}
        name={name}
        onChange={onChange}
      />
    </div>
  )
}

export default CountryPhone