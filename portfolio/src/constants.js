export const ARTICLES = {
  'helloworld': {
    'name': 'Hello World',
    'image': 'img/articles/code.jpg',
    'description':
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in mollis lacus, quis efficitur lectus. Duis egestas felis a orci porttitor eleifend. Nunc ultrices felis risus, convallis rutrum dui ullamcorper vel. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum a ultrices elit. Fusce porta magna fringilla felis molestie convallis. Nullam nec pretium neque. Nam purus risus, ultrices in augue a, gravida vestibulum nunc. Ut orci nisl, laoreet at mattis non, condimentum ut urna. Mauris at turpis a orci efficitur fringilla nec nec leo. Quisque rhoncus mauris ut erat cursus laoreet. Interdum et malesuada fames ac ante ipsum primis in faucibus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam a.',
    'path': 'helloworld.md',
  },
  'helloworl': {
    'name': 'Hello World',
    'image': 'img/articles/code.jpg',
    'description': 'Hello!',
    'path': 'helloworld.md'
  },
  'hellowor': {
    'name': 'Hello World',
    'image': 'img/articles/code.jpg',
    'description': 'Hello!',
    'path': 'helloworld.md'
  },
  'hellowo': {
    'name': 'Hello World',
    'image': 'img/articles/code.jpg',
    'description': 'Hello!',
    'path': 'helloworld.md'
  },
  'hellow': {
    'name': 'Hello World',
    'image': 'img/articles/code.jpg',
    'description': 'Hello!',
    'path': 'helloworld.md'
  },
  'hello': {
    'name': 'Hello World',
    'image': 'img/articles/code.jpg',
    'description': 'Hello!',
    'path': 'helloworld.md'
  },
  'hel': {
    'name': 'Hello World',
    'image': 'img/articles/code.jpg',
    'description': 'Hello!',
    'path': 'helloworld.md'
  },
  'hell': {
    'name': 'Hello World',
    'image': 'img/articles/code.jpg',
    'description': 'Hello!',
    'path': 'helloworld.md'
  }
};

export const PUBLICATIONS = [
  {
    doi: 'http://dx.doi.org/10.1145/3551349.3556945',
    abstract:
        'Infrastructure as Code (IaC) is the process of managing IT infrastructure via programmable configuration files (also called IaC scripts). Like other software artifacts, IaC scripts may contain security smells, which are coding patterns that can result in security weaknesses. Automated analysis tools to detect security smells in IaC scripts exist, but they focus on specific technologies such as Puppet, Ansible, or Chef. This means that when the detection of a new smell is implemented in one of the tools, it is not immediately available for the technologies supported by the other tools -- the only option is to duplicate the effort. This paper presents GLITCH, a new technology-agnostic framework that enables automated polyglot smell detection by transforming IaC scripts into an intermediate representation, on which different security smell detectors can be defined. GLITCH currently supports the detection of nine different security smells in scripts written in Puppet, Ansible, or Chef. We compare GLITCH with state-of-the-art security smell detectors. The results obtained not only show that GLITCH can reduce the effort of writing security smell analyses for multiple IaC technologies, but also that it has higher precision and recall than the current state-of-the-art tools.',
    pdf: 'https://arxiv.org/pdf/2205.14371.pdf',
    badges: [
      {
        name: 'Dataset',
        link:
            'https://figshare.com/articles/dataset/GLITCH_Replication_Package_with_Code_and_Datasets_ASE_2022_/19726603/2'
      },
      {
        name: 'Artifact Evaluation Award (Reusable)',
        link:
            'https://www.acm.org/publications/policies/artifact-review-and-badging-current#reusable'
      }
    ]
  },
  {
    doi: 'http://dx.doi.org/10.1109/ase56229.2023.00162',
    abstract:
        'This paper presents GLITCH, a new technology-agnostic framework that enables automated polyglot code smell detection for Infrastructure as Code scripts. GLITCH uses an intermediate representation on which different code smell detectors can be defined. It currently supports the detection of nine security smells and nine design & implementation smells in scripts written in Ansible, Chef, Docker, Puppet, or Terraform. Studies conducted with GLITCH not only show that GLITCH can reduce the effort of writing code smell analyses for multiple IaC technologies, but also that it has higher precision and recall than current state-of-the-art tools. A video describing and demonstrating GLITCH is available at: https://youtu.be/E4RhCcZjWbk.',
    pdf: 'https://arxiv.org/pdf/2308.09458.pdf'
  },
  {
    doi: 'http://dx.doi.org/10.1145/3663529.3663814',
    abstract:
        'Proof assistants enable users to develop machine-checked proofs regarding software-related properties. Unfortunately, the interactive nature of these proof assistants imposes most of the proof burden on the user, making formal verification a complex, and time-consuming endeavor. Recent automation techniques based on neural methods address this issue, but require good programmatic support for collecting data and interacting with proof assistants. This paper presents CoqPyt, a Python tool for interacting with the Coq proof assistant. CoqPyt improves on other Coq-related tools by providing novel features, such as the extraction of rich premise data. We expect our work to aid development of tools and techniques, especially LLM-based, designed for proof synthesis and repair. A video describing and demonstrating CoqPyt is available at: https://youtu.be/fk74o0rePM8.',
    pdf: 'https://dl.acm.org/doi/pdf/10.1145/3663529.3663814'
  },
  {
    doi: 'https://doi.org/10.1145/3643991.3644884',
    abstract:
        'Bug-fix benchmarks are essential for evaluating methodologies in automatic program repair (APR) and fault localization (FL). However, existing benchmarks, exemplified by Defects4J, need to evolve to incorporate recent bug-fixes aligned with contemporary development practices. Moreover, reproducibility, a key scientific principle, has been lacking in bug-fix benchmarks. To address these gaps, we present GitBug-Java, a reproducible benchmark of recent Java bugs. GitBug-Java features 199 bugs extracted from the 2023 commit history of 55 notable open-source repositories. The methodology for building GitBug-Java ensures the preservation of bug-fixes in fully-reproducible environments. We publish GitBug-Java at https://github.com/gitbugactions/gitbug-java.',
    pdf: 'https://arxiv.org/pdf/2402.02961'
  },
  {
    doi: 'http://dx.doi.org/10.1145/3639478.3640023',
    abstract:
        'Bug-fix benchmarks are fundamental in advancing various sub-fields of software engineering such as automatic program repair (APR) and fault localization (FL). A good benchmark must include recent examples that accurately reflect technologies and development practices of today. To be executable in the long term, a benchmark must feature test suites that do not degrade overtime due to, for example, dependencies that are no longer available. Existing benchmarks fail in meeting both criteria. For instance, Defects4J, one of the foremost Java benchmarks, last received an update in 2020. Moreover, full-reproducibility has been neglected by the majority of existing benchmarks. In this paper, we present GitBug-Actions: a novel tool for building bug-fix benchmarks with modern and fully-reproducible bug-fixes. GitBug-Actions relies on the most popular CI platform, GitHub Actions, to detect bug-fixes and smartly locally execute the CI pipeline in a controlled and reproducible environment. To the best of our knowledge, we are the first to rely on GitHub Actions to collect bug-fixes. To demonstrate our toolchain, we deploy GitBug-Actions to build a proof-of-concept Go bug-fix benchmark containing executable, fully-reproducible bug-fixes from different repositories. A video demonstrating GitBug-Actions is available at: https://youtu.be/aBWwa1sJYBs.',
    pdf: 'https://dl.acm.org/doi/pdf/10.1145/3639478.3640023'
  },
  {
    doi: 'https://doi.org/10.1109/TSE.2025.3553383',
    abstract:
        'Code smells are anti-patterns that violate code understandability, re-usability, changeability, and maintainability. It is important to identify code smells and locate them in the code. For this purpose, automated detection of code smells is a sought-after feature for development tools; however, the design and evaluation of such tools depends on the quality of oracle datasets. The typical approach for creating an oracle dataset involves multiple developers independently inspecting and annotating code examples for their existing code smells. Since multiple inspectors cast votes about each code example, it is possible for the inspectors to disagree about the presence of smells. Such disagreements introduce ambiguity into how smells should be interpreted. Prior work has studied developer perceptions of code smells in traditional source code; however, smells in Infrastructure-as-Code (IaC) have not been investigated. To understand the real-world impact of disagreements among developers and their perceptions of IaC code smells, we conduct an empirical study on the oracle dataset of GLITCH—a state-of-the-art detection tool for security code smells in IaC. We analyze GLITCH’s oracle dataset for code smell issues, their types, and individual annotations of the inspectors. Furthermore, we investigate possible confounding factors associated with the incidences of developer misaligned perceptions of IaC code smells. Finally, we triangulate developer perceptions of code smells in traditional source code with our results on IaC. Our study reveals that unlike developer perceptions of smells in traditional source code, their perceptions of smells in IaC are more substantially impacted by subjective interpretation of smell types and their co-occurrence relationships. For instance, the interpretation of admins by default, empty passwords, and hard-coded secrets varies considerably among raters and are more susceptible to misidentification than other IaC code smells. Consequently, the manual identification of IaC code smells involves annotation disagreements among developers—46.3% of studied IaC code smell incidences have at least one dissenting vote among three inspectors. Meanwhile, only 1.6% of code smell incidences in traditional source code are affected by inspector bias stemming from these disagreements. Hence, relying solely on the majority voting, would not fully represent the breadth of interpretation of the IaC under scrutiny.',
    pdf: '/articles/10.1109-TSE.2025.3553383-2.pdf'
  }
];