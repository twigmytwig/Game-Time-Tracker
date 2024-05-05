from PyQt6.QtWidgets import QLabel, QVBoxLayout, QWidget

class ProcessMonitorApp(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Process Monitor")

        self.label = QLabel("Latest Process Name: None", self)
        self.label.setFont(self.font())
        
        layout = QVBoxLayout(self)
        layout.addWidget(self.label)
        self.setLayout(layout)

    def update_process_name(self, process_name):
        self.label.setText(f"Latest Process Name: {process_name}")