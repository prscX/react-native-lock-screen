import React, { Component } from "react";
import { StyleSheet, ViewPropTypes, View } from "react-native";
import PropTypes from "prop-types";

import { Pin } from './Pin'

import style from './PinFragment.style'

class PinFragment extends Component {
  static propTypes = {
    confirmPin: PropTypes.object,
    deletePin: PropTypes.object,
    rippleProps: PropTypes.object,
    containerStyle: PropTypes.object,
    textStyle: PropTypes.object,
    suggestionStyle: PropTypes.object,
    onAdd: PropTypes.func,
    onRemove: PropTypes.func,
    onDone: PropTypes.func,

    backgroundColor: PropTypes.string
  };

  static defaultProps = {};

  shouldComponentUpdate() {
    return false;
  }

  _onPress(value) {
    if (value === 10) {
      this.props.onDone && this.props.onDone();
    } else if (value === 11) {
      this.props.onRemove && this.props.onRemove();
    } else {
      this.props.onAdd && this.props.onAdd(value.toString());
    }
  }

  _renderPin(value) {
    let { confirmPin, deletePin, rippleProps, containerStyle, textStyle, alphabetPinSuggestion, suggestionStyle } = this.props;

    if (this.props.renderPin) return this.props.renderPin();

    return (
      <Pin
        value={value}
        confirmPin={confirmPin}
        deletePin={deletePin}
        rippleProps={rippleProps}
        containerStyle={containerStyle}
        textStyle={textStyle}
        suggestionStyle={suggestionStyle}
        alphabetPinSuggestion={alphabetPinSuggestion}
        onPress={() => {
          this._onPress(value);
        }}
      />
    );
  }

  _renderPinRows() {
    if (this.props.renderPinRows) return this.props.renderPinRows();

    let styles = [style.pinContainer];
    if (this.props.backgroundColor) {
      styles.push({ backgroundColor: this.props.backgroundColor });
    }

    return (
      <View style={styles}>
        <View style={style.pinRowContainer}>
          {this._renderPin(1)}
          {this._renderPin(2)}
          {this._renderPin(3)}
        </View>
        <View style={style.pinRowContainer}>
          {this._renderPin(4)}
          {this._renderPin(5)}
          {this._renderPin(6)}
        </View>
        <View style={style.pinRowContainer}>
          {this._renderPin(7)}
          {this._renderPin(8)}
          {this._renderPin(9)}
        </View>
        <View style={style.pinRowContainer}>
          {this._renderPin(10)}
          {this._renderPin(0)}
          {this._renderPin(11)}
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={[style.container, this.props.style]}>
        {this._renderPinRows()}
      </View>
    );
  }
}

export { PinFragment }
