import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

const colors = {
  defaultTextColor: '#FFFFFF',
  defaultBoxBackgroundColor: '#AAAAAA',
  defaultButtonBackgroundColor: '#3B373C',
};

const styles = StyleSheet.create({
    callToActions: {
        position: 'absolute',
        alignItems: 'flex-end',
        flexDirection: 'column',
        overflow: 'hidden',
        borderRadius: 40,
    },
    closedCallToActions: {
        bottom: 30,
        right: 30,
        width: 60,
        height: 60,
        padding: 0,
    },
    openCallToActions: {
        bottom: 10,
        right: 10,
        padding: 20,
    },
    moreActions: {
        borderRadius: 40,
        width: 60,
        height: 60,
        paddingLeft: 15,
    },
    moreActionsImage: {
        tintColor: colors.defaultTextColor,
        width: 30,
        height: 30,
    },
    close: {
        transform: [{
            rotate: '45deg',
        }],
    },
    plus: {
        transform: [{
            rotate: '0deg',
        }],
    },
    touchable: {
        padding: 5,
        marginBottom: 5,
    },
    actionText: {
        fontSize: 22,
        color: colors.defaultTextColor,
    },
    action: {
        flex: 1,
        alignSelf: 'flex-end',
        justifyContent: 'center',
    },
    firstAction: {
        marginBottom: 20,
    },
});

export default class CallToActionBox extends Component {
    static propTypes = {
        actions: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                key: React.PropTypes.string.isRequired,
                onPress: React.PropTypes.func.isRequired,
                text: React.PropTypes.string,
            })
        ),
        boxColor: React.PropTypes.string,
        buttonColor: React.PropTypes.string,
        underlayColor: React.PropTypes.string,
    };

    constructor(props) {
        super(props);

        this.state = {
            callToActionsDisplay: false,
        };
    }

    handlePlusPress = () => {
        this.setState({
            callToActionsDisplay: !this.state.callToActionsDisplay,
        });
    };

    createPressHandler = (functionToCall) => () => {
        this.toggleMoreActions();
        functionToCall();
    };

    render() {
        return (
            <View
                style={[
                    styles.callToActions,
                    this.state.callToActionsDisplay
                        ? styles.openCallToActions
                        : styles.closedCallToActions,
                    this.props.boxColor
                        ? { backgroundColor: this.props.boxColor }
                        : { backgroundColor: colors.defaultBoxBackgroundColor },
                ]}
            >
                {this.props.actions.length > 1 && this.state.callToActionsDisplay
                    ? this.props.actions.map((action, index) => {
                        if (action === null) {
                            return null;
                        }

                        return (
                            <View
                                style={[
                                    styles.action,
                                    index === this.props.actions.length - 1
                                    ? styles.firstAction
                                    : {},
                                ]}
                                key={action.key}
                            >
                                <TouchableHighlight
                                    underlayColor={this.props.underlayColor}
                                    style={styles.touchable}
                                    onPress={this.createPressHandler(action.onPress)}
                                >
                                    <View>
                                        <Text
                                            style={[
                                                styles.actionText,
                                            ]}
                                        >
                                            {action.text || action.key}
                                        </Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        );
                    })
                    : null
                }
                <TouchableWithoutFeedback
                    onPress={this.props.actions.length > 1
                        ? this.handlePlusPress
                        : this.props.actions[0].onPress
                    }
                >
                    <View
                        style={[
                            styles.action,
                            styles.moreActions,
                            this.props.buttonColor
                                ? { backgroundColor: this.props.buttonColor }
                                : { backgroundColor: colors.defaultButtonBackgroundColor }
                        ]}
                    >
                        <Image
                            source={require('./CallToActionBoxImages/plus.png')}
                            style={[
                                styles.moreActionsImage,
                                this.state.callToActionsDisplay
                                    ? styles.close
                                    : styles.plus
                            ]}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}
