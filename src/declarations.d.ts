declare module 'typewriter-effect' {
  import React from 'react';

  export interface TypewriterOptions {
    strings?: string[];
    autoStart?: boolean;
    loop?: boolean;
    delay?: number | 'natural';
    deleteSpeed?: number | 'natural';
    cursor?: string;
    pauseFor?: number;
    devMode?: boolean;
    wrapperClassName?: string;
    cursorClassName?: string;
    stringSplitter?: (str: string) => string[];
    onCreateProps?: (props: unknown) => void;
  }

  export interface TypewriterClass {
    typeString(str: string): TypewriterClass;
    pauseFor(ms: number): TypewriterClass;
    deleteAll(speed?: number): TypewriterClass;
    deleteChars(count: number): TypewriterClass;
    start(): TypewriterClass;
    stop(): TypewriterClass;
    changeDelay(delay: number): TypewriterClass;
    changeDeleteSpeed(speed: number): TypewriterClass;
  }

  export interface TypewriterProps {
    options?: TypewriterOptions;
    onInit?: (typewriter: TypewriterClass) => void;
    component?: React.ElementType;
  }

  const Typewriter: React.FC<TypewriterProps>;
  export default Typewriter;
}
