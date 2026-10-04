import { NodePermissionService } from "@alfresco/aca-shared";
import { ShareDataTableAdapter, ShareDataRow } from "@alfresco/adf-content-services";
import { DataColumnComponent } from "@alfresco/adf-core";
import { ExtensionService, NavigationState, NodePermissions, ProfileState, RuleContext, RuleEvaluator, SelectionState } from "@alfresco/adf-extensions";
import { NodeEntry, RepositoryInfo } from "@alfresco/js-api";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UnioviService{
    profile$: Observable<ProfileState> | undefined;
    profile: ProfileState | undefined;
    navigation$: Observable<NavigationState> | undefined;
    navigation: NavigationState | undefined;

    constructor(private extensionService: ExtensionService, private nodePermissionService: NodePermissionService){}
    
    getSelectionState(nodeEntry: NodeEntry): SelectionState {
        return {count: 1, nodes: [nodeEntry], libraries: [], isEmpty: false, first: nodeEntry, last: nodeEntry,
        folder: nodeEntry?.entry.isFolder ? nodeEntry : undefined,  file: nodeEntry?.entry.isFile ? nodeEntry : undefined };
    }

    getProfileState() {
        return new Promise<ProfileState>((resolve, reject) => {
            if (this.profile)
                return resolve(this.profile);

            this.profile = {} as ProfileState;
            this.profile$?.subscribe( (profile) => { 
                    if (profile.id) { 
                        this.profile = profile;
                        resolve(this.profile);
                    }
                }, (err) => {
                    this.profile = undefined;
                    reject(err);
                }
            );
        });
    }
    
    private check = (source: any, permissions: string[], options?: any): boolean => {
        return this.nodePermissionService.check(source, permissions, options);
    };

    async getContextActions(context: { data: ShareDataTableAdapter, row: ShareDataRow, col: DataColumnComponent }) {
        const contextMenu = this.extensionService.features["contextMenu"] || [];
        const actions = await Promise.all(
            contextMenu.map(async (action: { rules: { visible: string; }; }) => {
                try {
                    const isVisible = !action.rules || !action.rules.visible || action.rules.visible == "true" || this.extensionService.evaluateRule(action.rules.visible, await this.getRuleContext(context.row.node));
                    return isVisible ? action : null;
                } catch (error) {
                    return null;
                }
            })
        );

        return actions.filter((action: any) => action !== null);
    }

    private getEvaluator = (key: string): RuleEvaluator => {
        return this.extensionService.getEvaluator(key);
    };
    
    async getRuleContext(nodeEntry: NodeEntry): Promise<RuleContext> {
        const selectionState = this.getSelectionState(nodeEntry);
        const profileState: ProfileState = await this.getProfileState();
        const navigationState: NavigationState = await this.getNavigationState();
        const nodePermissions: NodePermissions = {
            check: this.check
        };

        const ruleContext: RuleContext = {
            repository: new RepositoryInfo,
            auth: undefined,
            selection: selectionState,
            profile: profileState,
            permissions: nodePermissions,
            getEvaluator: this.getEvaluator,
            navigation: navigationState
        };
        return ruleContext;
    }

    getNavigationState() {
        return new Promise<NavigationState>((resolve, reject) => {
            if (this.navigation)
                return resolve(this.navigation);

            this.navigation = {} as NavigationState;
            this.navigation$?.subscribe((navigation) => {
                this.navigation = navigation;
                resolve(this.navigation);
            }, (err) => {
                this.navigation = undefined;
                reject(err);
            }
            );
        });
    }

}