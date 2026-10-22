<?php

require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $task = trim($_POST['task'] ?? '');

    if (!empty($task)) {
        $stmt = $pdo->prepare(
            "INSERT INTO todos (task) VALUES (:task)"
        );

        $stmt->execute([':task' => $task]);
    }
}

header('Location: index.php');
exit;

?>