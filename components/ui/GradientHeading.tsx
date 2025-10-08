import React from 'react';

interface GradientHeadingProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  highlightWords?: string;
  fullGradient?: boolean;
  gradientFrom?: string;
  gradientTo?: string;
}

/**
 * GradientHeading component for creating impactful headlines with gradient text
 * 
 * @param children - The heading text content
 * @param level - The heading level (h1-h6), defaults to h2
 * @param className - Additional classes to apply
 * @param highlightWords - Text to be highlighted with gradient (if not provided, no text will be highlighted)
 * @param fullGradient - Whether to apply gradient to the entire heading (overrides highlightWords)
 * @param gradientFrom - Starting gradient color (defaults to blue-600)
 * @param gradientTo - Ending gradient color (defaults to purple-600)
 */
export default function GradientHeading({
  children,
  level = 2,
  className = '',
  highlightWords,
  fullGradient = false,
  gradientFrom = 'from-blue-400',
  gradientTo = 'to-purple-400'
}: GradientHeadingProps) {
  const baseClasses = 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tighter leading-tight mb-6';
  const combinedClasses = `${baseClasses} ${className}`;
  
  // If fullGradient is true, apply gradient to the entire heading
  if (fullGradient) {
    const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
    return (
      <HeadingTag className={`${combinedClasses} bg-clip-text text-transparent bg-gradient-to-r ${gradientFrom} ${gradientTo}`}>
        {children}
      </HeadingTag>
    );
  }

  // If highlightWords is provided, highlight specific words with gradient
  if (highlightWords) {
    const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
    const parts = String(children).split(highlightWords);
    
    if (parts.length === 1) {
      // No match found, return regular heading
      return <HeadingTag className={combinedClasses}>{children}</HeadingTag>;
    }
    
    return (
      <HeadingTag className={combinedClasses}>
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            {part}
            {index < parts.length - 1 && (
              <span className={`bg-clip-text text-transparent bg-gradient-to-r ${gradientFrom} ${gradientTo}`}>
                {highlightWords}
              </span>
            )}
          </React.Fragment>
        ))}
      </HeadingTag>
    );
  }

  // Default: no gradient
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
  return <HeadingTag className={combinedClasses}>{children}</HeadingTag>;
}