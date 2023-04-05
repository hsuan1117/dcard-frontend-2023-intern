enum TodoStatus {
    COMPLETED,
    IN_PROGRESS,
    NOT_STARTED

}

interface Todo {
    id: number;
    title: string;
    status: TodoStatus;
}