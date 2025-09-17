import type { SVGProps } from "react"

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m18 16 4-4-4-4" />
      <path d="m6 8-4 4 4 4" />
      <path d="m14.5 4-5 16" />
    </svg>
  ),
  javascript: (props: SVGProps<SVGSVGElement>) => (
    <svg fill="currentColor" viewBox="0 0 32 32" {...props}>
      <path d="M0 0h32v32H0z" fill="#f7df1e" />
      <path d="M21.228 23.472c.328.56.928.828 1.528.828.7 0 1.2-.356 1.2-.956 0-.628-.472-.884-.972-1.14l-.7-.356c-1.372-.684-2.228-1.54-2.228-3.056 0-1.883 1.556-3.14 3.756-3.14 1.543 0 2.684.588 3.444 1.8L26.3 18.772c-.272-.473-.772-.74-1.372-.74-.644 0-.988.356-.988.8 0 .5.3.712.8.94l.7.356c1.6.8 2.456 1.684 2.456 3.14 0 2.228-1.784 3.472-4.328 3.472-1.944 0-3.256-.956-3.956-2.256l1.2-1.012zM12.856 24.228h2.2l-.3-1.684h.244c1.6 0 2.828-.412 2.828-2.6 0-1.572-.856-2.2-2-2.372l1.628-4.6h-2.2l-1.344 3.944h-.144l-1.128-3.944h-2.2l1.9 6.228c-.588.272-.9.772-.9 1.444 0 .972.8 1.416 1.916 1.416zm1.184-3.92h.8c.644 0 .972-.21.972-.672 0-.5-.356-.644-.944-.644h-.828l-.001 1.316z"/>
    </svg>
  ),
  python: (props: SVGProps<SVGSVGElement>) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
       <path d="M14.23,19.5a5.55,5.55,0,0,1-4.46,0,1.2,1.2,0,0,1-.5-1.5,1.18,1.18,0,0,1,1.5-.5,3.17,3.17,0,0,0,2,0,1.18,1.18,0,0,1,1.5.5,1.2,1.2,0,0,1-.5,1.5m-5.32-6.55a4.23,4.23,0,0,1-3-.12,1.2,1.2,0,0,1-.62-1.12V9.89a1.2,1.2,0,0,1,.62-1.12,4.23,4.23,0,0,1,3-.12V4.5a5.52,5.52,0,0,1,5.32,0v4.15a4.23,4.23,0,0,1,3,.12,1.2,1.2,0,0,1,.62,1.12v1.82a1.2,1.2,0,0,1-.62,1.12,4.23,4.23,0,0,1-3,.12V19.5a5.52,5.52,0,0,1-5.32,0Z" fill="#3776ab"/>
    </svg>
  ),
  css: (props: SVGProps<SVGSVGElement>) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M1.373 0l1.83 20.62L12 24l8.797-3.38L22.627 0H1.373zm17.38 7.373H6.84l.2 2.25h10.51l-.79 8.85-3.01.83-.01.01-3.02-.84-.2-2.25h2.2l.1 1.12 1.72.48.01.01 1.72-.48.2-2.2H6.43l-1.03-11.6h15.2l-.24 2.68z" fill="#1572b6"/>
    </svg>
  ),
  typescript: (props: SVGProps<SVGSVGElement>) => (
    <svg fill="currentColor" viewBox="0 0 32 32" {...props}>
      <path fill="#3178c6" d="M0 0h32v32H0z"/>
      <path fill="#fff" d="m9.5 23.5-1-11h15v2.7h-5.2v2.3h4.4v2.7h-4.4v3.3h5.2v2.7h-15z"/>
    </svg>
  ),
  react: (props: SVGProps<SVGSVGElement>) => (
    <svg fill="currentColor" viewBox="-11.5 -10.23174 23 20.46348" {...props}>
      <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
      <g stroke="#61dafb" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2"/>
        <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
        <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
      </g>
    </svg>
  )
}
