export default function Heading({
  tagName: Tag = "h2",
  className = "",
  before,
  text,
  after,
  beforeClass = "",
  textClass = "",
  afterClass = "",
  beforeId,
  textId,
  afterId,
  beforeProps,
  textProps,
  afterProps,
  children,
  ...props
}) {
  const tagLevel = typeof Tag === "string" ? Tag.toLowerCase() : "h2";

  const hasManualHeadingClass = /\bh[1-6]\b/.test(className);
  const isHeadingTag = ["h1", "h2", "h3", "h4", "h5", "h6"].includes(tagLevel);
  const finalClassName =
    hasManualHeadingClass || !isHeadingTag
      ? className
      : `${tagLevel} ${className}`.trim();

  const isPropBased =
    before !== undefined || text !== undefined || after !== undefined;

  const mergeSpanProps = (idFromProp, clsFromProp, bag) => {
    const bagSafe = bag || {};
    const mergedClass =
      [clsFromProp, bagSafe.className].filter(Boolean).join(" ") || undefined;
    return {
      id: idFromProp ?? bagSafe.id,
      className: mergedClass,
      ...bagSafe,
    };
  };

  return (
    <Tag className={finalClassName} {...props}>
      {isPropBased ? (
        <>
          {before !== undefined && (
            <span {...mergeSpanProps(beforeId, beforeClass, beforeProps)}>
              {before}
            </span>
          )}
          {text !== undefined && (
            <span {...mergeSpanProps(textId, textClass, textProps)}>
              {text}
            </span>
          )}
          {after !== undefined && (
            <span {...mergeSpanProps(afterId, afterClass, afterProps)}>
              {after}
            </span>
          )}
        </>
      ) : (
        children
      )}
    </Tag>
  );
}
