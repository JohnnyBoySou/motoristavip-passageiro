
import React from 'react'
import { Block, theme, Text } from "galio-framework";
import { StyleSheet } from 'react-native'

export default function InfoBox(props) {
  if (props.hide) {
    return null;
  }
  return (
    <Block row={true} card flex style={styles.card}>
      <Block flex space="between" style={styles.cardDescription}>
        <Text bold style={{ fontSize: 18, }}>{props.title}</Text>
        {props.children}
      </Block>
    </Block>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginBottom: 2,
    marginLeft: 2,
    marginRight: -28,
  },
  cardTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2
  },
})