export const ARTICLES = {
    "helloworld": {
        "name": "Hello World",
        "image": "img/articles/code.jpg",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in mollis lacus, quis efficitur lectus. Duis egestas felis a orci porttitor eleifend. Nunc ultrices felis risus, convallis rutrum dui ullamcorper vel. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum a ultrices elit. Fusce porta magna fringilla felis molestie convallis. Nullam nec pretium neque. Nam purus risus, ultrices in augue a, gravida vestibulum nunc. Ut orci nisl, laoreet at mattis non, condimentum ut urna. Mauris at turpis a orci efficitur fringilla nec nec leo. Quisque rhoncus mauris ut erat cursus laoreet. Interdum et malesuada fames ac ante ipsum primis in faucibus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam a.",
        "path": "helloworld.md",
    },
    "helloworl": {
        "name": "Hello World",
        "image": "img/articles/code.jpg",
        "description": "Hello!",
        "path": "helloworld.md"
    },
    "hellowor": {
        "name": "Hello World",
        "image": "img/articles/code.jpg",
        "description": "Hello!",
        "path": "helloworld.md"
    },
    "hellowo": {
        "name": "Hello World",
        "image": "img/articles/code.jpg",
        "description": "Hello!",
        "path": "helloworld.md"
    },
    "hellow": {
        "name": "Hello World",
        "image": "img/articles/code.jpg",
        "description": "Hello!",
        "path": "helloworld.md"
    },
    "hello": {
        "name": "Hello World",
        "image": "img/articles/code.jpg",
        "description": "Hello!",
        "path": "helloworld.md"
    },
    "hel": {
        "name": "Hello World",
        "image": "img/articles/code.jpg",
        "description": "Hello!",
        "path": "helloworld.md"
    },
    "hell": {
        "name": "Hello World",
        "image": "img/articles/code.jpg",
        "description": "Hello!",
        "path": "helloworld.md"
    }
};

export const PUBLICATIONS = [
    {
        doi: "http://dx.doi.org/10.1145/3551349.3556945",
        abstract: "Infrastructure as Code (IaC) is the process of managing IT infrastructure via programmable configuration files (also called IaC scripts). Like other software artifacts, IaC scripts may contain security smells, which are coding patterns that can result in security weaknesses. Automated analysis tools to detect security smells in IaC scripts exist, but they focus on specific technologies such as Puppet, Ansible, or Chef. This means that when the detection of a new smell is implemented in one of the tools, it is not immediately available for the technologies supported by the other tools -- the only option is to duplicate the effort. This paper presents GLITCH, a new technology-agnostic framework that enables automated polyglot smell detection by transforming IaC scripts into an intermediate representation, on which different security smell detectors can be defined. GLITCH currently supports the detection of nine different security smells in scripts written in Puppet, Ansible, or Chef. We compare GLITCH with state-of-the-art security smell detectors. The results obtained not only show that GLITCH can reduce the effort of writing security smell analyses for multiple IaC technologies, but also that it has higher precision and recall than the current state-of-the-art tools.",
        pdf: "https://arxiv.org/pdf/2205.14371.pdf",
        badges: [
            {
                name: "Artifact Evaluation Award (Reusable)",
                link: "https://www.acm.org/publications/policies/artifact-review-and-badging-current#reusable"
            },
            {
                name: "Dataset",
                link: "https://figshare.com/articles/dataset/GLITCH_Replication_Package_with_Code_and_Datasets_ASE_2022_/19726603/2"
            }
        ]
    }
];