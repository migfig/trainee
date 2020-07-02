export interface ITestDefinition {
    id: string;
    text: string;
    testString: string;
    failed: boolean;
}

export default interface IDefinition {
    id: string;
    name: string;
    category: string;
    description: string;
    htmlSource: string;
    sourceTests: ITestDefinition[];
    isComplete: boolean;
    failedTests: ITestDefinition[];
    challengeType?: number;
    isHidden?: boolean;
    videoUrl?: string;
    forumTopicId?: number;
}
