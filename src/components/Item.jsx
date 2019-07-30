import React, { useMemo } from 'react'
import ptype from 'prop-types'
import Color from 'color-lite'
import colorList from 'color-name'
import styles from './Item.module.scss'

export default function Item(props) {
	const isBright = useMemo(() => {
		const rgb = colorList[props.color]
		const color = rgb && rgb.length ? new Color(...rgb) : new Color(props.color)
		return color.l > 50
	}, [props.color])

	return (
		<article
			className={styles.wrapper}
			style={{
				backgroundColor: props.color,
				color: isBright ? 'black' : 'white',
			}}
		>
			{props.name}
		</article>
	)
}

Item.propTypes = {
	color: ptype.string,
	name: ptype.string,
}
Item.defaultProps = {
	color: 'white',
	name: '',
}
