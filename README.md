# react-native-plus-button-box
A component to display an Android-like "+" button and display action items

# Properties

Property Name | Type
--- | ---
actions | React.PropTypes.arrayOf( <br>     React.PropTypes.shape({ <br>         key: React.PropTypes.string.isRequired,<br>         onPress: React.PropTypes.func.isRequired,<br>         text: React.PropTypes.string.isRequired<br>     }) <br> )
boxColor | React.PropTypes.string
buttonColor | React.PropTypes.string
underlayColor | React.PropTypes.string
