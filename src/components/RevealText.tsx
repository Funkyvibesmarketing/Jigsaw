import { Fragment } from 'react';
import { motion, useTransform, type MotionValue } from 'motion/react';

type Range = [number, number];

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInCubic = (t: number) => t * t * t;

// Share of the range spread across the words (the rest is each word's own travel time)
const STAGGER = 0.55;

function Word({ word, index, count, progress, enter, leave }: {
  word: string;
  index: number;
  count: number;
  progress: MotionValue<number>;
  enter: Range | null;
  leave: Range | null;
}) {
  const start = (count > 1 ? index / (count - 1) : 0) * STAGGER;
  const local = (p: number, [from, to]: Range) => clamp01((clamp01((p - from) / (to - from)) - start) / (1 - STAGGER));

  // Words rise up out of a mask on the way in, and carry on up out of it on the way out
  const y = useTransform(progress, (p) => {
    const tin = enter ? easeOutCubic(local(p, enter)) : 1;
    const tout = leave ? easeInCubic(local(p, leave)) : 0;
    return `${110 * (1 - tin) - 110 * tout}%`;
  });
  const opacity = useTransform(progress, (p) => {
    const tin = enter ? local(p, enter) : 1;
    const tout = leave ? local(p, leave) : 0;
    return Math.min(1, tin * 1.5) * (1 - tout);
  });

  return (
    // inline-block mask; the padding keeps descenders (g, p, y) from being clipped
    <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', paddingBottom: '0.15em', marginBottom: '-0.15em' }}>
      <motion.span style={{ display: 'inline-block', y, opacity }}>{word}</motion.span>
    </span>
  );
}

/**
 * Text that reveals word by word on scroll. `enter` / `leave` are scroll-progress ranges:
 * words rise in one after another across `enter` and lift out one after another across `leave`.
 * Use "\n" in `text` for a line break. Renders inline, so the surrounding <p> keeps its styling.
 */
export function RevealText({ text, progress, enter = null, leave = null }: {
  text: string;
  progress: MotionValue<number>;
  enter?: Range | null;
  leave?: Range | null;
}) {
  const lines = text.split('\n');
  const total = lines.reduce((n, l) => n + l.split(' ').filter(Boolean).length, 0);
  let i = 0;
  return (
    <>
      {lines.map((line, li) => (
        <Fragment key={li}>
          {li > 0 && <br />}
          {line.split(' ').filter(Boolean).map((word, wi, arr) => {
            const index = i++;
            return (
              <Fragment key={wi}>
                <Word word={word} index={index} count={total} progress={progress} enter={enter} leave={leave} />
                {wi < arr.length - 1 ? ' ' : ''}
              </Fragment>
            );
          })}
        </Fragment>
      ))}
    </>
  );
}
