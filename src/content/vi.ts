export const vi = {
    transition: {
        loading: "Đang tải",
        entering: "Đang vào",
        next: "Tiếp theo",
        },
    nav: {
        home: "Trang chủ",
        about: "Giới thiệu",
        skills: "Kỹ năng",
        projects: "Dự án",
        experience: "Kinh nghiệm",
        timeline: "Hành trình",
        contact: "Liên hệ",
        resume: "CV",
        },

    hero: {
        title: "Xin chào, mình là Trần Nguyễn Anh Khoa.",
        description:
            "Software Engineer đam mê xây dựng những trải nghiệm web hiện đại, tương tác và có chiều sâu.",
        hireMe:
            "Hãy thuê mình với giá 5 ổ bánh mì, 1 ly nước và 1 đồng vàng.",
        viewProjects: "Xem dự án",
        contact: "Liên hệ với mình",
    },

    about: {
    label: "Giới thiệu",
    title: "Hãy thuê mình để mình có đồ ăn.",
    description:
        "Mình là sinh viên Khoa học Máy tính và Software Engineer, chủ yếu làm việc với React và JavaScript để xây dựng các ứng dụng web hiện đại, trực quan và có tính tương tác. Mình cũng có kinh nghiệm với TypeScript, .NET và Node.js. Nói chung là mình thích tự tay làm ra những thứ có thể chạy được và giải quyết được vấn đề thực tế. Làm ơn hãy thuê mình, có thể trả với 3 ổ bánh mì và 1 đồng vàng.",
    },
    skills: {
        label: "Kỹ năng",
        title: "Công nghệ mình biết sử dụng.",
    },

    projects: {
        label: "Dự án",
        title: "Những thứ mình đã xây dựng.",
        viewProject: "Xem dự án",

        descriptions: {
            smartAiFridge:
            "Tủ lạnh thông minh tích hợp IoT và computer vision để nhận diện thực phẩm.",

            libraryManagement:
            "Hệ thống quản lý thư viện full-stack được xây dựng với React và ASP.NET Core.",

            campsiteEcommerce:
            "Nền tảng đặt chỗ và thương mại điện tử dành cho các dịch vụ cắm trại.",

            ticTacToe:
            "Trò chơi Tic Tac Toe chạy trên trình duyệt với PHP xử lý phía server, quản lý trạng thái trò chơi bằng session và cập nhật nước đi theo thời gian thực.",
        },
    },

    experience: {
        label: "Kinh nghiệm",
        title: "Nơi mình đã làm việc.",
        date: "Tháng 6 2025 — Tháng 8 2025",
        location: "Thành phố Hồ Chí Minh",
        role: "Thực tập sinh Software Developer",
        company: "SHPT Software Joint Stock Company",
        description:
            "Tham gia phát triển cổng thông tin Quản lý Nhân sự (HRM) trực tuyến với vai trò Full-Stack Developer, làm việc trên cả frontend, backend và các lớp cơ sở dữ liệu.",
        },

    timeline: {
        label: "Hành trình",
        title: "Hành trình của tôi.",

        items: {
            startedComputerScience: {
            title: "Bắt đầu học Khoa học Máy tính",
            company: "Trường Đại học Bách khoa, Đại học Quốc gia TP. Hồ Chí Minh",
            },

            softwareDeveloperIntern: {
            title: "Thực tập sinh Software Developer",
            company: "SHPT Software",
            },

            publishedAiFridgeResearch: {
            title: "Công bố nghiên cứu về Smart AI Fridge",
            company: "arXiv",
            },
        },
        },

    contact: {
        label: "Liên hệ",
        title: "Hãy xem xét thuê mình.",
        description:
        "Mình hiện đang tìm kiếm những cơ hội mới. Nếu bạn có một dự án hoặc vị trí phù hợp, đừng ngần ngại liên hệ.",
        email: "Email",
        linkedin: "LinkedIn",
        github: "GitHub",
    },

    footer: {
        rights: "Mọi quyền được bảo lưu.",
    },

    language: {
        vietnamese: "Tiếng Việt",
        english: "English",
    },
} as const;