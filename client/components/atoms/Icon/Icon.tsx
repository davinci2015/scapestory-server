interface Props {
    d: string
    size?: number
    viewBox?: string
    color?: string
}

const Icon = ({
    d,
    size = 24,
    viewBox = '0 0 24 24',
    color
}: Props) => {
    return (
        <svg
            fill={color}
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox={viewBox}>
            <path d={d}/>
        </svg>
    )
}

Icon.EYE_HIDE = 'M39.738 14.678a41.044 41.044 0 0 1 4.466 4.964c.82 1.071 1.43 1.971 1.768 2.525a3.5 3.5 0 0 1 .012 3.663c-.343.561-.958 1.468-1.784 2.547a41.073 41.073 0 0 1-4.5 4.994c-4.756 4.46-10.017 7.129-15.653 7.129h-.062c-3.073-.01-6.066-.818-8.958-2.307l-8.142 8.14c-.89.891-2.334.889-3.222-.005a2.284 2.284 0 0 1 .005-3.223l7.41-7.409c-2.346-1.766-4.475-3.88-6.363-6.17-.72-.874-1.36-1.72-1.912-2.509a24.41 24.41 0 0 1-.782-1.174 3.5 3.5 0 0 1-.001-3.673c.342-.561.958-1.468 1.784-2.548a40.998 40.998 0 0 1 4.505-4.993C13.07 10.169 18.343 7.5 23.997 7.5c4.003 0 7.85 1.355 11.499 3.784l5.619-5.618a2.274 2.274 0 0 1 3.222.006 2.284 2.284 0 0 1-.005 3.223l-5.215 5.213c.209.188.416.378.62.57zM24.047 36.5c4.647 0 9.128-2.379 13.267-6.36a38.006 38.006 0 0 0 4.952-5.862l.187-.278-.186-.279a37.812 37.812 0 0 0-5.39-6.285c-.19-.175-.38-.347-.571-.517l-18.27 18.266c1.981.86 3.988 1.315 6.01 1.315zm-6.765-7.006c-1.795-3.3-1.571-6.552.69-9.408 2.48-3.13 6.315-3.938 11.186-2.465l3.462-3.461c-2.792-1.72-5.66-2.66-8.573-2.66-4.66 0-9.144 2.379-13.278 6.36a37.812 37.812 0 0 0-4.943 5.861L5.64 24l.186.279a37.812 37.812 0 0 0 4.942 5.861 29.913 29.913 0 0 0 3.185 2.682l3.33-3.328zm3.826-6.924c-.995 1.257-1.26 2.5-.805 3.904l5.51-5.509c-2.134-.263-3.653.277-4.705 1.605z'
Icon.EYE_SHOW = 'M45.984 25.83c-.343.561-.958 1.468-1.784 2.547a41.073 41.073 0 0 1-4.5 4.994c-4.756 4.46-10.017 7.129-15.653 7.129h-.062c-5.649-.018-10.917-2.69-15.677-7.138a41.049 41.049 0 0 1-4.504-4.981c-.827-1.077-1.45-1.992-1.783-2.538a3.5 3.5 0 0 1-.001-3.673c.342-.561.958-1.468 1.784-2.548a40.998 40.998 0 0 1 4.505-4.993C13.07 10.169 18.343 7.5 23.997 7.5s10.926 2.67 15.688 7.129a40.998 40.998 0 0 1 4.505 4.993c.825 1.079 1.44 1.985 1.783 2.546a3.5 3.5 0 0 1 .01 3.662zM5.826 24.28a37.812 37.812 0 0 0 4.942 5.861c4.135 3.981 8.618 6.36 13.279 6.36 4.647 0 9.128-2.379 13.267-6.36a38.006 38.006 0 0 0 4.952-5.862l.187-.278-.186-.279a37.812 37.812 0 0 0-4.942-5.861c-4.134-3.981-8.618-6.36-13.278-6.36s-9.144 2.379-13.278 6.36a37.812 37.812 0 0 0-4.943 5.861L5.64 24l.186.279zm18.17-8.779a8.5 8.5 0 1 1 0 17 8.5 8.5 0 0 1 0-17zm4.5 8.5a4.5 4.5 0 1 0-9 0 4.5 4.5 0 0 0 9 0z'
Icon.EYE_SHOW_FULL = 'M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z'
Icon.CLOSE = 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'
Icon.HEART = 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
Icon.HEART_OUTLINE = 'M19.664 3.99c-2.64-1.8-5.9-.96-7.66 1.1-1.76-2.06-5.02-2.91-7.66-1.1-1.4.96-2.28 2.58-2.34 4.29-.14 3.88 3.3 6.99 8.55 11.76l.1.09c.76.69 1.93.69 2.69-.01l.11-.1c5.25-4.76 8.68-7.87 8.55-11.75-.06-1.7-.94-3.32-2.34-4.28zm-7.56 14.56l-.1.1-.1-.1c-4.76-4.31-7.9-7.16-7.9-10.05 0-2 1.5-3.5 3.5-3.5 1.54 0 3.04.99 3.57 2.36h1.87c.52-1.37 2.02-2.36 3.56-2.36 2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z'
Icon.ADD_FULL = 'M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm4 11h-3v3c0 .55-.45 1-1 1s-1-.45-1-1v-3H6c-.55 0-1-.45-1-1s.45-1 1-1h3V6c0-.55.45-1 1-1s1 .45 1 1v3h3c.55 0 1 .45 1 1s-.45 1-1 1z'
Icon.SHARE = 'M14.41 14.66v5.25l8.436-7.86c.63-.6.63-1.59 0-2.19L14.41 2v5.1C5.074 8.39 1.351 14.78 0 21.2c3.332-4.5 7.746-6.54 14.41-6.54z'
Icon.FIRE = 'M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z'
Icon.ARROW_DOWN = 'M11 5v11.17l-4.88-4.88c-.39-.39-1.03-.39-1.42 0-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0l6.59-6.59c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L13 16.17V5c0-.55-.45-1-1-1s-1 .45-1 1z'
Icon.FACEBOOK = 'M48 24.147C48 10.81 37.255 0 24 0S0 10.81 0 24.147C0 36.199 8.776 46.189 20.25 48V31.127h-6.094v-6.98h6.094v-5.32c0-6.052 3.583-9.395 9.065-9.395 2.625 0 5.372.472 5.372.472v5.942h-3.026c-2.981 0-3.911 1.862-3.911 3.773v4.528h6.656l-1.064 6.98H27.75V48C39.224 46.189 48 36.199 48 24.147z'
Icon.INSTAGRAM = 'M46.739 8.272c.593 1.52 1.001 3.264 1.113 5.824.13 2.56.148 3.375.148 9.904s-.037 7.345-.148 9.904c-.112 2.541-.52 4.303-1.113 5.824-.612 1.576-1.428 2.912-2.764 4.247-1.335 1.336-2.67 2.152-4.247 2.764-1.52.593-3.264 1.001-5.824 1.113-2.56.13-3.375.148-9.904.148s-7.345-.037-9.904-.148c-2.541-.112-4.303-.52-5.824-1.113-1.576-.612-2.912-1.428-4.247-2.764-1.336-1.335-2.152-2.67-2.764-4.247C.668 38.208.26 36.464.148 33.904.018 31.344 0 30.53 0 24s.037-7.345.148-9.904c.112-2.541.52-4.303 1.113-5.824.612-1.576 1.428-2.912 2.764-4.247C5.36 2.689 6.695 1.873 8.272 1.26 9.792.668 11.536.26 14.096.148 16.656.018 17.47 0 24 0s7.345.037 9.904.148c2.541.112 4.303.52 5.824 1.113 1.576.612 2.912 1.428 4.247 2.764 1.336 1.335 2.152 2.67 2.764 4.247zM43.53 33.7c.111-2.522.149-3.301.149-9.7 0-6.399-.038-7.16-.149-9.7-.111-2.337-.5-3.598-.834-4.451-.446-1.132-.965-1.93-1.8-2.764-.834-.835-1.65-1.372-2.763-1.8-.835-.333-2.114-.722-4.451-.834-2.523-.13-3.302-.148-9.7-.148-6.4 0-7.16.037-9.7.148-2.338.112-3.599.501-4.452.835-1.131.445-1.929.964-2.764 1.799-.834.835-1.372 1.65-1.799 2.764-.333.834-.723 2.114-.834 4.45-.13 2.523-.149 3.302-.149 9.701 0 6.399.037 7.16.149 9.7.111 2.337.5 3.598.834 4.451.446 1.132.965 1.93 1.8 2.764.834.835 1.65 1.372 2.763 1.8.835.333 2.114.722 4.451.834 2.523.13 3.283.148 9.7.148 6.418 0 7.16-.037 9.7-.148 2.338-.112 3.599-.501 4.452-.835 1.131-.445 1.929-.964 2.763-1.799.835-.835 1.373-1.65 1.8-2.764.333-.834.723-2.114.834-4.45zM23.981 11.666c6.807 0 12.334 5.527 12.334 12.334 0 6.807-5.527 12.334-12.334 12.334-6.806 0-12.333-5.527-12.333-12.334 0-6.807 5.527-12.334 12.333-12.334zm0 20.346c4.415 0 8.013-3.598 8.013-8.012a8.003 8.003 0 0 0-8.013-8.012c-4.432 0-8.012 3.598-8.012 8.012 0 4.433 3.598 8.012 8.012 8.012zM36.798 14.06a2.875 2.875 0 1 1 0-5.75 2.875 2.875 0 0 1 0 5.75z'
Icon.DONE = "M9 16.2l-3.5-3.5c-.39-.39-1.01-.39-1.4 0-.39.39-.39 1.01 0 1.4l4.19 4.19c.39.39 1.02.39 1.41 0L20.3 7.7c.39-.39.39-1.01 0-1.4-.39-.39-1.01-.39-1.4 0L9 16.2z"
Icon.PLANT = "M37.836 15.756a20.857 20.857 0 0 0-.388-2.029c-.172-.72-.428-1.33-.767-1.832-.34-.501-.72-.752-1.14-.752-.048-.213-.283-.188-.703.074-.42.261-.617.349-.59.261.027-.087-.119.022-.437.327l-.476.458-.477.483c-.42.403-1.032.711-1.835.924-.803.213-1.683.343-2.642.393-.96.049-1.921.081-2.886.098a43.21 43.21 0 0 0-2.901.147c-.97.082-1.751.22-2.344.417a15.032 15.032 0 0 0-3.298 1.562 14.144 14.144 0 0 0-2.755 2.274 9.775 9.775 0 0 0-1.924 3.018 9.409 9.409 0 0 0-.703 3.598c0 .578.048 1.145.145 1.7.022.11.108.35.26.72.15.372.225.579.225.622 0 .207-.167.47-.5.785-.335.317-.701.622-1.1.916a5.844 5.844 0 0 0-1.1 1.071c-.333.42-.5.821-.5 1.203a.984.984 0 0 0 .073.376c.016.033.046.087.089.163a7.214 7.214 0 0 0 .533.867c.108.142.275.272.501.393.226.12.501.18.825.18.312 0 .635-.175.97-.524.333-.348.616-.73.848-1.145.232-.414.474-.796.727-1.144.253-.35.466-.524.639-.524.248 0 .765.202 1.551.606.787.403 1.261.632 1.423.687a14.09 14.09 0 0 0 4.623.768c2.414 0 4.773-.589 7.08-1.766 2.36-1.189 4.286-2.65 5.778-4.384 1.493-1.734 2.487-3.822 2.983-6.264.215-1.07.323-2.121.323-3.157 0-.415-.043-.938-.13-1.57zM29.382 21.3a.99.99 0 0 1-.727.311c-1.962 0-3.65.284-5.068.85-1.416.568-2.863 1.527-4.34 2.88-.215.206-.576.566-1.082 1.079-.507.512-.906.9-1.196 1.16-.227.208-.47.312-.728.312a.989.989 0 0 1-.728-.311 1.01 1.01 0 0 1-.307-.736c0-.262.103-.507.307-.736 1.315-1.472 2.584-2.669 3.807-3.59 1.223-.921 2.622-1.652 4.195-2.192 1.573-.54 3.286-.81 5.14-.81a.99.99 0 0 1 .727.311c.205.208.307.453.307.736 0 .284-.102.53-.307.736z"
Icon.FISH = "M40.63 24.342c-2.64-4.771-6.983-7.688-12.073-8.229-2.551-3.252-10.558-4.076-10.904-4.11a.656.656 0 0 0-.59.26.67.67 0 0 0-.09.643c.785 2.056 1.59 4.395 1.802 5.352-1.454.671-2.725 1.385-3.544 1.98-1.777-2.869-5.404-2.905-5.57-2.905A.663.663 0 0 0 9 18c0 3.863 1.334 5.802 2.227 6.667C10.334 25.532 9 27.47 9 31.333c0 .369.296.667.66.667.167 0 3.794-.036 5.571-2.904 1.089.79 2.97 1.79 5.027 2.62-.454.742-.686 1.922-.686 3.617 0 .369.295.667.66.667.197 0 4.69-.04 6.927-2.688 5.691-.11 10.591-3.118 13.472-8.32a.672.672 0 0 0 0-.65zm-13.24-4.64c-.012.018-1.211 1.897-1.211 4.965 0 1.666.353 2.968.65 3.767a.668.668 0 0 1-.62.9.661.661 0 0 1-.618-.432 12.244 12.244 0 0 1-.734-4.235c0-3.495 1.374-5.615 1.433-5.703a.658.658 0 0 1 .913-.186.672.672 0 0 1 .187.923zm2.459 10.853a.656.656 0 0 1-.916-.185c-.06-.089-1.433-2.208-1.433-5.703s1.374-5.615 1.433-5.703a.658.658 0 0 1 .913-.186.672.672 0 0 1 .187.923c-.012.02-1.211 1.898-1.211 4.966 0 3.095 1.198 4.945 1.21 4.963a.67.67 0 0 1-.183.925zM32.786 24a1.33 1.33 0 0 1-1.322-1.333 1.33 1.33 0 0 1 1.322-1.334 1.33 1.33 0 0 1 1.321 1.334A1.33 1.33 0 0 1 32.786 24z"
Icon.STONE = "M28.117 18.46a.799.799 0 0 1-.427-1.04.785.785 0 0 1 1.03-.43l2.576 1.076-1.094-4.347a.794.794 0 0 0-.464-.54l-5.112-2.12a.78.78 0 0 0-.598 0l-5.112 2.12a.794.794 0 0 0-.465.54l-2.341 9.044a.79.79 0 0 1-.969.556.797.797 0 0 1-.55-.978l.413-1.518-1.406.635-2.582 12.66c-.1.493.273.956.772.956h5.924l1.126-8.095a.798.798 0 0 1 .315-.531l4.709-3.48a.781.781 0 0 1 .93 0l4.708 3.48a.798.798 0 0 1 .315.531l1.126 8.095h5.924a.794.794 0 0 0 .772-.957l-2.582-12.659-6.938-2.998z"
Icon.THUMBS_UP = "M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"

export default Icon