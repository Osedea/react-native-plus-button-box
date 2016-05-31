# react-native-plus-button-box
A component to display an Android-like "+" button and display action items

# Properties

Property Name | Type
--- | ---
actions | React.PropTypes.arrayOf(
        |   React.PropTypes.shape({
        |       key: React.PropTypes.string.isRequired,
        |       onPress: React.PropTypes.func.isRequired,
        |       text: React.PropTypes.string.isRequired
        |   })
        | )
boxColor | React.PropTypes.string
buttonColor | React.PropTypes.string
underlayColor | React.PropTypes.string
