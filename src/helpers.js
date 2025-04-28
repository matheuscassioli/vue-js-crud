export function exportExcel(tasks, headerData, fileName) {
    const header = `"ID","${headerData}"\n`;
    const rows = tasks.map(task => {
        const taskEscaped = `"${task.task.replace(/"/g, '""')}"`;
        return `${task.id},${taskEscaped}`;
    }).join("\n");

    const csvContent = header + rows;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        const uniqueFileName = fileName + ' • ' + formatDate();
        link.setAttribute('href', url);
        link.setAttribute('download', `${uniqueFileName}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}



export function exportPDF(tasks) {
    console.log(tasks)
}

const formatDate = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}h${minutes}m${seconds}s`;
};