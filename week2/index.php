<?php

require_once 'db.php';

$stmt = $pdo->query(
    "SELECT * FROM todos ORDER BY id DESC"
);

$todos = $stmt->fetchAll(PDO::FETCH_ASSOC);

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Task Manager - PHP & MySQL</title>

    <link rel="stylesheet" href="style.css">
</head>

<body>

    <div class="container">

        <header>
            <h1>Task Manager</h1>
            <p>Full-Stack Edition: PHP & MySQL</p>
        </header>

        <form action="add.php" method="POST" class="input-group">

            <input
                type="text"
                name="task"
                placeholder="What needs to be done?"
                required
                maxlength="255"
                autocomplete="off"
            >

            <button type="submit">Add Task</button>

        </form>

        <h2>Your Task List</h2>

        <ul>

            <?php if (empty($todos)): ?>

                <li>No tasks yet. Add your first task!</li>

            <?php else: ?>

                <?php foreach ($todos as $todo): ?>

                    <li>
                        <span>
                            <?= htmlspecialchars($todo['task']) ?>
                        </span>

                        <a
                            class="delete-btn"
                            href="delete.php?id=<?= $todo['id'] ?>"
                            onclick="return confirm('Delete this task?');"
                        >
                            Delete
                        </a>
                    </li>

                <?php endforeach; ?>

            <?php endif; ?>

        </ul>

    </div>

</body>
</html>