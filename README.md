ToDo App

Approach to the challenge –
1)	Keep the design simple and intuitive.
2)	Have lesser click streams to perform an action.
3)	Make the code modular and testable.
4)	Keep scalability in mind.

Design of the app –
1)	Primarily it contains a text box for user to enter a new task.
2)	New tasks are populated below the text box in a todo list.
3)	Each task created contains 4 entities (from left to right)
3a) A checkbox to mark the task completed and back to outstanding.
3a) Name of the task.
3c) Arrow icons to change the priority of a task from high to low and vice-versa.
3d) A cross icon to delete a task.
4)	At the bottom, there are 3 tabs for the user to switch and show specific tasks.
4a) ‘All’ tab to show all the tasks in the todo list.
4b) ‘Outstanding’ to show the tasks that are yet to be completed.
4c) ‘Completed’ to show the tasks which are done.

Stories, Instructions to use the app –
1)	Add a new task –
User enters a task name in the text box and hits enter. The new task is populated below in the todo list.
2)	View outstanding tasks –
Click on the ‘outstanding’ tab at the bottom. This will show all the outstanding tasks. Note that the tab will show up only if there is a task in the todo list.
3)	Mark a task completed –
Check the task’s checkbox on the left. The task label is striked to signify the task is completed.
4)	Prioritize the task –
Hover over the task you want to prioritize, up and down arrows show up. Click on the up or down arrow to prioritize the task higher or lower respectively. The task prioritized higher is moved up by one place and the one prioritized lower is moved down one place.
5)	Deleting a task –
Hover over the task you want to delete, a cross icon appears on the right side. Click on it and the task is removed from the todo list.





Few other instructions –
1)	By unchecking the checkbox of a task, the task is switched back from ‘completed’ to ‘outstanding’.
2)	As already mentioned, a down arrow is added to prioritize the tasks easily, rather than having just a single up arrow to prioritize a task higher.
3)	Other than ‘Outstanding’ tab at the bottom, there are 2 more tabs, namely ‘All’ and ‘Completed’ to show the user all the tasks in the todo list and only the completed tasks respectively.
4)	When there are no tasks in the list, status specific tabs are not shown.
5)	By default, all the tasks are shown in the list, unless user switches to specific tabs.