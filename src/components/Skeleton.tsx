type Props = {
  slot?: string
}

export function Line(props: Props) {
  return <div className={"c-skeleton c-skeleton__line"} {...props} />
}