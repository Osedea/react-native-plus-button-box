// @flow

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

export type Actions = {
    key: string,
    onPress: (*) => void,
    text?: string,
};

type Props = {
    actions: Array<Action>,
    boxColor?: string,
    buttonColor?: string,
    underlayColor?: string,
    style?: Object,
};

export default class CallToActionBox extends Component<Props> {
    state = {
        callToActionsDisplay: false,
    };

    handleButtonPress = () => {
        this.setState({
            callToActionsDisplay: !this.state.callToActionsDisplay,
        });
    };

    createPressHandler = (functionToCall) => () => {
        this.handleButtonPress();
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
                    this.props.style,
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
                        ? this.handleButtonPress
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
